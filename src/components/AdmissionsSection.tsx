/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, AdmissionApplication } from '../types';
import { Landmark, ClipboardList, Calculator, UserPlus, Info, CheckCircle, Clock, Download, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function AdmissionsSection() {
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  
  // Application Form values
  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [targetGrade, setTargetGrade] = useState(() => {
    const saved = localStorage.getItem('gja_classes_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
      } catch (e) {}
    }
    return 'Early Years (Pre-K to K)';
  });
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [address, setAddress] = useState('');
  const [prevSchool, setPrevSchool] = useState('');
  const [message, setMessage] = useState('');
  const [passport, setPassport] = useState('');
  const [dragActive, setDragActive] = useState(false);
  
  // New aligned fields matching the administrative register
  const [parentOccupation, setParentOccupation] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('Father');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('Unspecified');
  const [genotype, setGenotype] = useState('Unspecified');
  const [allergies, setAllergies] = useState('None');
  const [enrolledTerm, setEnrolledTerm] = useState('1st Term 2026/2027');

  // Tuition Estimator values
  const [estimatorGrade, setEstimatorGrade] = useState<'early' | 'lower' | 'upper'>('early');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBusRouteId, setSelectedBusRouteId] = useState<string>('');

  // Load settings (services & bus routes)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('gja_school_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  const defaultServices = [
    { id: "serv-1", name: "School Gourmet Lunch Program", description: "Nutritionally balanced organic meals", price: 45000, isCompulsory: false, type: "standard" },
    { id: "serv-2", name: "Academy Bus Transport Service", description: "Convenient door-to-door transit routes", price: 60000, isCompulsory: false, type: "bus" },
    { id: "serv-3", name: "Club Membership Premium Pass", description: "Access to all after-school specialist clubs", price: 30000, isCompulsory: false, type: "standard" },
    { id: "serv-4", name: "Comprehensive Insurance & Medical", description: "Mandatory campus healthcare wrapper", price: 15000, isCompulsory: true, type: "standard" },
    { id: "serv-5", name: "Practical/S.T.E.A.M. Lab Materials", description: "Mandatory laboratory and design materials", price: 20000, isCompulsory: true, type: "standard" }
  ];

  const defaultBusRoutes = [
    { id: "route-1", route: "Gbagada - Lekki", price: 65000 },
    { id: "route-2", route: "Ikeja - Maryland", price: 55000 },
    { id: "route-3", route: "Victoria Island - Ikoyi", price: 75000 },
    { id: "route-4", route: "Surulere - Yaba", price: 50000 },
    { id: "route-5", route: "Festac - Mile 2", price: 45000 }
  ];

  const services = settings?.services || defaultServices;
  const busRoutes = settings?.busRoutes || defaultBusRoutes;

  // Pricing constants (per term, 3 terms per year in Naira)
  const baseTuitions = {
    early: 120000,
    lower: 160000,
    upper: 185000
  };

  const calculateTotal = () => {
    let total = baseTuitions[estimatorGrade];
    
    // Add compulsory services
    services.forEach((s: any) => {
      if (s.isCompulsory) {
        total += s.price;
      }
    });

    // Add selected optional services
    services.forEach((s: any) => {
      if (!s.isCompulsory && selectedServices.includes(s.id)) {
        if (s.type === 'bus') {
          const chosen = busRoutes.find((r: any) => r.id === selectedBusRouteId);
          total += chosen ? chosen.price : s.price;
        } else {
          total += s.price;
        }
      }
    });
    return total;
  };

  const generatePDF = async (appData?: any) => {
    const isDraft = !appData;
    
    // Load fresh settings in real-time from localStorage
    const freshSettingsSaved = localStorage.getItem('gja_school_settings');
    let activeSettings = settings;
    if (freshSettingsSaved) {
      try {
        activeSettings = JSON.parse(freshSettingsSaved);
      } catch (e) {
        console.error("Error parsing fresh settings in generatePDF", e);
      }
    }

    const sName = (activeSettings?.name || "Grace Junior Academy").toUpperCase();
    const sMotto = activeSettings?.motto || "Enter to Learn, Depart to Serve";
    const sAddress = activeSettings?.address || "ATC JALINGO";
    const sPhone = activeSettings?.phone || "+2348032569057";
    const sEmail = activeSettings?.email || "admissions@gracejunioracademy.org";
    const logoUrl = activeSettings?.logo;

    let logoImg: HTMLImageElement | null = null;
    if (logoUrl) {
      try {
        logoImg = await new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
          if (!logoUrl.startsWith('data:')) {
            img.crossOrigin = "anonymous";
          }
          img.onload = () => resolve(img);
          img.onerror = () => {
            if (!logoUrl.startsWith('data:')) {
              // Fallback without crossOrigin
              const img2 = new Image();
              img2.onload = () => resolve(img2);
              img2.onerror = () => resolve(null);
              img2.src = logoUrl;
            } else {
              resolve(null);
            }
          };
          img.src = logoUrl;
          // 1.5 seconds timeout
          setTimeout(() => resolve(null), 1500);
        });
      } catch (err) {
        console.error("Error loading logo image:", err);
      }
    }

    const data = {
      studentName: isDraft ? "" : (appData?.studentName || studentName).trim(),
      dateOfBirth: isDraft ? "" : (appData?.dateOfBirth || dob),
      gender: isDraft ? "" : (appData?.gender || gender),
      targetGrade: isDraft ? "" : (appData?.targetGrade || targetGrade),
      parentName: isDraft ? "" : (appData?.parentName || parentName).trim(),
      parentPhone: isDraft ? "" : (appData?.parentPhone || parentPhone).trim(),
      parentEmail: isDraft ? "" : (appData?.parentEmail || parentEmail).trim(),
      address: isDraft ? "" : (appData?.address || address).trim(),
      previousSchool: isDraft ? "" : (appData?.previousSchool || prevSchool).trim(),
      message: isDraft ? "" : (appData?.message || message).trim(),
      parentOccupation: isDraft ? "" : (appData?.parentOccupation || parentOccupation).trim(),
      guardianRelationship: isDraft ? "" : (appData?.guardianRelationship || guardianRelationship),
      emergencyContactName: isDraft ? "" : (appData?.emergencyContactName || emergencyName).trim(),
      emergencyContactPhone: isDraft ? "" : (appData?.emergencyContactPhone || emergencyPhone).trim(),
      bloodGroup: isDraft ? "" : (appData?.bloodGroup || bloodGroup),
      genotype: isDraft ? "" : (appData?.genotype || genotype),
      allergies: isDraft ? "" : (appData?.allergies || allergies).trim(),
      enrolledTerm: isDraft ? "" : (appData?.enrolledTerm || enrolledTerm || '1st Term 2026/2027'),
      passport: isDraft ? "" : (appData?.passport || passport),
      status: appData?.status || (isDraft ? 'Draft' : 'Pending'),
      dateSubmitted: appData?.dateSubmitted || (isDraft ? '______/______/____________' : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }))
    };

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    // Color definitions
    const primaryColor = [15, 23, 42]; // Slate 900
    const accentColor = [185, 28, 28]; // Red 700
    const mutedColor = [100, 116, 139]; // Slate 500
    const lightBg = [248, 250, 252]; // Slate 50
    const borderCol = [226, 232, 240]; // Slate 200

    // Margins
    const leftMargin = 15;
    const rightMargin = 195;
    let y = 15;

    // Helper functions
    const drawDivider = (offsetY: number, color = borderCol) => {
      doc.setDrawColor(color[0], color[1], color[2]);
      doc.setLineWidth(0.4);
      doc.line(leftMargin, offsetY, rightMargin, offsetY);
    };

    const getVal = (val: string | undefined, fieldLabel: string) => {
      if (isDraft) {
        if (fieldLabel === 'Child Full Name') return '_____________________________________';
        if (fieldLabel === 'Date of Birth') return '_______/_______/___________';
        if (fieldLabel === 'Previous School') return '_____________________________________';
        if (fieldLabel === 'Parent/Guardian Name') return '_____________________________________';
        if (fieldLabel === 'Parent Phone Number') return '___________________________';
        if (fieldLabel === 'Parent Email Address') return '___________________________';
        if (fieldLabel === 'Parent Occupation / Profession') return '___________________________';
        if (fieldLabel === 'Residential Address') return '____________________________________________________';
        if (fieldLabel === 'Known Allergies') return '___________________________';
        if (fieldLabel === 'Special Considerations / Medical Notes') return '____________________________________________________';
        if (fieldLabel === 'Emergency Contact Name') return '___________________________';
        if (fieldLabel === 'Emergency Contact Phone') return '___________________________';
        if (fieldLabel === 'Blood Group') return '________';
        if (fieldLabel === 'Genotype') return '________';
        if (fieldLabel === 'Gender') return '_________________';
        if (fieldLabel === 'Class Applied For') return '_________________';
        if (fieldLabel === 'Prospective Enrolled Term') return '_________________';
        if (fieldLabel === 'Guardian Relationship') return '_________________';
        return '___________________________';
      }
      const v = (val || '').trim();
      const isPlaceholder = !v || 
                            v.toLowerCase() === 'not specified' || 
                            v.toLowerCase() === 'unspecified' || 
                            v.toLowerCase() === 'none' ||
                            v.toLowerCase() === 'draft applicant';
      if (isPlaceholder) {
        return 'None';
      }
      return v;
    };

    const drawHeader = () => {
      // Top Decorative line (accent primary bar)
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(leftMargin, y, rightMargin - leftMargin, 4, 'F');
      y += 10;

      let logoDrawn = false;
      if (logoImg) {
        try {
          doc.addImage(logoImg, 'JPEG', leftMargin, y + 1, 15, 15);
          logoDrawn = true;
        } catch (err) {
          console.error("Failed to add settings logo to PDF:", err);
        }
      }

      if (!logoDrawn) {
        // Draw Academic Crest Seal vector logo on the left of header
        const cx = leftMargin + 8;
        const cy = y + 8;

        // Outer Gold circle border
        doc.setFillColor(217, 119, 6); // amber-600 gold
        doc.circle(cx, cy, 9, 'F');

        // Inner Slate circle body
        doc.setFillColor(15, 23, 42); // slate-900 primary
        doc.circle(cx, cy, 8, 'F');

        // Inner open book pages icon inside the badge
        doc.setFillColor(217, 119, 6); // gold book wrapper back
        doc.rect(cx - 4, cy - 1, 3.5, 3, 'F');
        doc.rect(cx + 0.5, cy - 1, 3.5, 3, 'F');
        doc.setFillColor(255, 255, 255); // book pages white
        doc.rect(cx - 3.5, cy - 0.7, 2.7, 2.4, 'F');
        doc.rect(cx + 0.8, cy - 0.7, 2.7, 2.4, 'F');
        doc.setDrawColor(217, 119, 6);
        doc.setLineWidth(0.35);
        doc.line(cx, cy - 1.5, cx, cy + 2.2); // center spine divider

        // Gold stars or dots representing excellence below the book
        doc.setFillColor(217, 119, 6); // gold
        doc.circle(cx - 2.5, cy + 3.8, 0.45, 'F');
        doc.circle(cx, cy + 3.8, 0.45, 'F');
        doc.circle(cx + 2.5, cy + 3.8, 0.45, 'F');

        // Tiny Gold crown triangles above the badge
        doc.triangle(cx - 3.5, cy - 4.5, cx - 1.2, cy - 4.5, cx - 2.3, cy - 6, 'F');
        doc.triangle(cx - 1.2, cy - 4.5, cx + 1.2, cy - 4.5, cx, cy - 6.5, 'F');
        doc.triangle(cx + 1.2, cy - 4.5, cx + 3.5, cy - 4.5, cx + 2.3, cy - 6, 'F');
      }

      // School Name starting exactly next to the emblem
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(15);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(sName, leftMargin + 20, y + 3.5);

      // School Motto
      doc.setFont("Helvetica", "italic");
      doc.setFontSize(8.5);
      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.text("Motto: " + sMotto, leftMargin + 20, y + 7.5);

      // School Address & Administrative Details
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      
      const displayAddress = sAddress.length > 85 ? sAddress.substring(0, 82) + "..." : sAddress;
      doc.text(displayAddress, leftMargin + 20, y + 11.5);
      doc.text(`Admissions Desk • Email: ${sEmail} • Tel: ${sPhone}`, leftMargin + 20, y + 15);

      // Subtitle Voucher block on the far right
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.text(
        isDraft ? "DRAFT PREVIEW" : "OFFICIAL APPLICATION", 
        rightMargin, 
        y + 3.5, 
        { align: 'right' }
      );

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      doc.text("Status: " + (data.status || 'Pending').toUpperCase(), rightMargin, y + 7.5, { align: 'right' });
      doc.text("Date: " + data.dateSubmitted, rightMargin, y + 11.5, { align: 'right' });

      y += 19;

      drawDivider(y);
      y += 8;
    };

    const drawSectionHeader = (title: string) => {
      doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.setLineWidth(0.3);
      doc.rect(leftMargin, y, rightMargin - leftMargin, 8, 'FD');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(title, leftMargin + 3, y + 5.5);
      y += 13;
    };

    const drawFieldLine = (label1: string, val1: string, label2?: string, val2?: string) => {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      doc.text(label1, leftMargin + 2, y);

      if (label2) {
        doc.text(label2, leftMargin + 95, y);
      }

      y += 4.5;
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      
      const v1 = val1 || 'N/A';
      const truncatedV1 = v1.length > 40 ? v1.substring(0, 38) + "..." : v1;
      doc.text(truncatedV1, leftMargin + 2, y);

      if (label2) {
        const v2 = val2 || 'N/A';
        // Avoid overlapping with the passport photo frame drawn on the far right of Section 1
        const col2Limit = y < 115 ? 25 : 40;
        const truncatedV2 = v2.length > col2Limit ? v2.substring(0, col2Limit - 2) + "..." : v2;
        doc.text(truncatedV2, leftMargin + 95, y);
      }

      y += 7;
    };

    drawHeader();

    // Section 1: Child Particulars
    drawSectionHeader("1. CHILD PARTICULARS");
    const passportY = y - 4; // capture top level of first field line in Section 1
    
    drawFieldLine("Child Full Name", getVal(data.studentName, "Child Full Name"), "Date of Birth", getVal(data.dateOfBirth, "Date of Birth"));
    drawFieldLine("Gender", getVal(data.gender, "Gender"), "Class Applied For", getVal(data.targetGrade, "Class Applied For"));
    drawFieldLine("Prospective Enrolled Term", getVal(data.enrolledTerm, "Prospective Enrolled Term"), "Previous School", getVal(data.previousSchool, "Previous School"));
    
    // Draw passport photo box on the right of Section 1
    if (data.passport) {
      try {
        let format = 'JPEG';
        if (data.passport.startsWith('data:image/png')) {
          format = 'PNG';
        } else if (data.passport.startsWith('data:image/webp')) {
          format = 'WEBP';
        }
        
        // Background frame
        doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
        doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
        doc.setLineWidth(0.3);
        doc.rect(rightMargin - 32, passportY, 28, 33, 'FD');
        
        // draw photo
        doc.addImage(data.passport, format, rightMargin - 31, passportY + 1, 26, 31);
      } catch (err) {
        console.error("PDF drawing passport photo error:", err);
      }
    } else {
      // draw placeholder photo frame
      doc.setFillColor(250, 250, 250);
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.setLineWidth(0.3);
      doc.rect(rightMargin - 32, passportY, 28, 33, 'FD');
      
      doc.line(rightMargin - 32, passportY, rightMargin - 4, passportY + 33);
      doc.line(rightMargin - 4, passportY, rightMargin - 32, passportY + 33);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      doc.text("AFFIX", rightMargin - 18, passportY + 14, { align: 'center' });
      doc.text("PASSPORT", rightMargin - 18, passportY + 18, { align: 'center' });
      doc.text("PHOTO", rightMargin - 18, passportY + 22, { align: 'center' });
    }
    
    y += 2;

    // Section 2: Parent / Guardian Particulars
    drawSectionHeader("2. PARENT / GUARDIAN PARTICULARS");
    drawFieldLine("Parent/Guardian Name", getVal(data.parentName, "Parent/Guardian Name"), "Guardian Relationship", getVal(data.guardianRelationship, "Guardian Relationship"));
    drawFieldLine("Parent Phone Number", getVal(data.parentPhone, "Parent Phone Number"), "Parent Email Address", getVal(data.parentEmail, "Parent Email Address"));
    drawFieldLine("Parent Occupation / Profession", getVal(data.parentOccupation, "Parent Occupation / Profession"), "Residential Address", getVal(data.address, "Residential Address"));
    y += 2;

    // Section 3: Clinical & Medical Profile
    drawSectionHeader("3. EMERGENCY CLINICAL PROFILE");
    drawFieldLine("Blood Group", getVal(data.bloodGroup, "Blood Group"), "Genotype", getVal(data.genotype, "Genotype"));
    drawFieldLine("Known Allergies", getVal(data.allergies, "Known Allergies"), "Special Considerations / Medical Notes", getVal(data.message, "Special Considerations / Medical Notes"));
    drawFieldLine("Emergency Contact Name", getVal(data.emergencyContactName, "Emergency Contact Name"), "Emergency Contact Phone", getVal(data.emergencyContactPhone, "Emergency Contact Phone"));
    y += 4;

    // Section 4: Authentication & Terms Checklist
    drawSectionHeader("4. OFFICE FILING STATUS AND SIGNATURES");
    
    // Info statement
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    const introTerms = "By signing below, parent/guardian acknowledges that the information submitted is true and comprehensive to the best of their knowledge. Any falsification might lead to the revoking of the offer of admission.";
    doc.text(introTerms, leftMargin + 2, y, { maxWidth: rightMargin - leftMargin - 4 });
    y += 12;

    // Signature boxes
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.setLineWidth(0.3);
    
    // Signature lines
    doc.line(leftMargin + 5, y + 10, leftMargin + 75, y + 10);
    doc.text("Parent/Guardian Legal Signature", leftMargin + 5, y + 14);
    doc.text("Date of Submission: " + (data.dateSubmitted || new Date().toLocaleDateString()), leftMargin + 5, y + 18);

    doc.line(rightMargin - 75, y + 10, rightMargin - 5, y + 10);
    doc.text("Admissions Registrar Signature", rightMargin - 75, y + 14);
    doc.text("Official School Seal", rightMargin - 75, y + 18);

    // Draw a neat solid stamp box
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.rect(rightMargin - 30, y + 11.5, 25, 10);
    doc.setFontSize(5.5);
    doc.text("PLACE STAMP", rightMargin - 17.5, y + 17, { align: "center" });

    y += 22;
    drawDivider(y);
    y += 5;

    // Footer info
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text("PDF generated on: " + new Date().toLocaleString(), leftMargin, y);
    doc.text(`${sName} Management System • Record ID: ` + Date.now().toString(16).toUpperCase(), rightMargin, y, { align: 'right' });

    // Save PDF
    const filenameStudent = data.studentName && data.studentName.trim() ? data.studentName : 'Draft_Application';
    const filename = `${sName.replace(/\s+/g, '_')}_Application_${filenameStudent.replace(/\s+/g, '_')}.pdf`;
    doc.save(filename);
  };

  const handleOptionalToggle = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedServices([...selectedServices, id]);
    } else {
      setSelectedServices(selectedServices.filter((sid) => sid !== id));
      // If unchecking the bus service, clear the selected route
      const serviceObj = services.find((s: any) => s.id === id);
      if (serviceObj?.type === 'bus') {
        setSelectedBusRouteId('');
      }
    }
  };

  // Load existing filings
  useEffect(() => {
    const saved = localStorage.getItem('grace_admissions');
    if (saved) {
      try {
        setApplications(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        if (file.size > 2 * 1024 * 1024) {
          setErrorMsg("File is too large. Please upload an image under 2MB.");
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPassport(event.target.result as string);
            setErrorMsg('');
          }
        };
        reader.readAsDataURL(file);
      } else {
        setErrorMsg("Incorrect file type. Please upload an image file.");
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentName || !dob || !parentName || !parentPhone || !parentEmail || !address) {
      setErrorMsg("Please fill out all required fields marked with an asterisk (*).");
      return;
    }
    setErrorMsg('');

    const newApp: AdmissionApplication = {
      studentName,
      dateOfBirth: dob,
      gender,
      targetGrade,
      parentName,
      parentPhone,
      parentEmail,
      address,
      previousSchool: prevSchool,
      message,
      status: 'Pending',
      parentOccupation,
      guardianRelationship,
      emergencyContactName: emergencyName,
      emergencyContactPhone: emergencyPhone,
      bloodGroup,
      genotype,
      allergies,
      enrolledTerm,
      passport,
      dateSubmitted: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    localStorage.setItem('grace_admissions', JSON.stringify(updated));

    // Clear form
    setStudentName('');
    setDob('');
    setParentName('');
    setParentPhone('');
    setParentEmail('');
    setAddress('');
    setPrevSchool('');
    setMessage('');
    setParentOccupation('');
    setGuardianRelationship('Father');
    setEmergencyName('');
    setEmergencyPhone('');
    setBloodGroup('Unspecified');
    setGenotype('Unspecified');
    setAllergies('None');
    setEnrolledTerm('1st Term 2026/2027');
    setPassport('');
    
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10" id="admissions-section-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header content block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1 bg-amber-500/10 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-200">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Admissions Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Join the Grace Junior Family</h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Submit a secure, digital application online. Our admissions board meets weekly to process filings. Review the tuition fee schedule and configure optional benefits using the calculator below.
          </p>
        </div>

        {/* Dynamic Tuition & Cost Calculator Block */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8" id="pricing-estimator">
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center space-x-2 text-blue-900">
              <Calculator className="w-5 h-5 text-amber-600" />
              <h3 className="text-xl font-extrabold tracking-tight">New Intake Fees Calculator</h3>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm">
              Use this widget to estimate cost of tuition. Grace Junior Academy maintains fully transparent pricing structures, with no hidden laboratory or textbook surcharges.
            </p>

            <div className="space-y-4 pt-2">
              {/* Grade select Row */}
              <div className="space-y-2">
                <label className="text-slate-700 font-bold text-xs uppercase tracking-wide">Class Category</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setEstimatorGrade('early')}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition select-none ${
                      estimatorGrade === 'early' 
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Nursery <span className="block font-medium font-mono text-[10px] opacity-80">Ages 3-5</span>
                  </button>
                  <button 
                    onClick={() => setEstimatorGrade('lower')}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition select-none ${
                      estimatorGrade === 'lower' 
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Lower Primary <span className="block font-medium font-mono text-[10px] opacity-80">Ages 6-8</span>
                  </button>
                  <button 
                    onClick={() => setEstimatorGrade('upper')}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition select-none ${
                      estimatorGrade === 'upper' 
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Upper Primary <span className="block font-medium font-mono text-[10px] opacity-80">Ages 9-11</span>
                  </button>
                </div>
              </div>

              {/* Compulsory Services Row */}
              <div className="space-y-2 pt-2">
                <label className="text-slate-500 font-bold text-[10px] uppercase tracking-wide block">Compulsory Campus Services (Included)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services.filter((s: any) => s.isCompulsory).map((s: any) => (
                    <div key={s.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-[11px]">
                      <div className="font-semibold text-slate-800 pr-1 truncate">
                        {s.name}
                        <span className="block text-[8px] text-slate-400 font-normal truncate">{s.description}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-600 shrink-0">₦{s.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkbox Rows */}
              <div className="space-y-3 pt-2">
                <label className="text-slate-700 font-bold text-xs uppercase tracking-wide block">Optional Campus Add-ons</label>
                
                {services.filter((s: any) => !s.isCompulsory).map((s: any) => {
                  const isChecked = selectedServices.includes(s.id);
                  const isBusService = s.type === 'bus';
                  
                  return (
                    <div key={s.id} className="p-3.5 bg-slate-50 border border-slate-150/60 rounded-xl space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            id={`opt-${s.id}`} 
                            checked={isChecked} 
                            onChange={(e) => handleOptionalToggle(s.id, e.target.checked)}
                            className="accent-amber-500 w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor={`opt-${s.id}`} className="text-slate-700 text-xs sm:text-sm font-semibold cursor-pointer">
                            {s.name} <span className="block text-[11px] text-slate-400 font-normal">{s.description}</span>
                          </label>
                        </div>
                        <span className="font-mono text-xs sm:text-sm font-bold text-slate-650 shrink-0">
                          {isBusService && selectedBusRouteId ? "Route Rate" : `+₦${s.price.toLocaleString()}`}/term
                        </span>
                      </div>

                      {/* Dynamic Bus Route Dropdown triggers when checked and service is bus type */}
                      {isBusService && isChecked && (
                        <div className="pl-7 pt-2 border-t border-slate-200/50 space-y-1.5 animate-fade-in">
                          <label className="text-[10px] font-black tracking-wider text-amber-800 uppercase block">🚍 Select Bus Transit Route:</label>
                          <select
                            value={selectedBusRouteId}
                            onChange={(e) => setSelectedBusRouteId(e.target.value)}
                            className="w-full bg-white border border-slate-200 focus:border-amber-500 rounded-xl py-2 px-3 text-xs focus:outline-none text-slate-900 font-medium cursor-pointer"
                          >
                            <option value="">-- Choose Route Profile (Applies Custom Pricing) --</option>
                            {busRoutes.map((r: any) => (
                              <option key={r.id} value={r.id}>
                                {r.route} (₦{r.price.toLocaleString()}/term)
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:col-span-4 lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between" id="calculator-receipt">
            <div className="space-y-5">
              <h4 className="text-amber-400 font-extrabold uppercase tracking-widest text-[10px] border-b border-slate-800 pb-2 flex items-center space-x-1">
                <Landmark className="w-3.5 h-3.5" />
                <span>Admission Estimate Generator</span>
              </h4>
              
              <div className="space-y-3 divide-y divide-slate-800 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-300">New Intake Fess</span>
                  <span className="font-mono font-bold">₦{baseTuitions[estimatorGrade].toLocaleString()}</span>
                </div>
                {/* Compulsory services breakdown */}
                {services.filter((s: any) => s.isCompulsory).map((s: any) => (
                  <div key={s.id} className="flex justify-between items-center py-2 pt-2">
                    <span className="text-slate-300">{s.name} <span className="text-[9px] text-amber-500/80">(Compulsory)</span></span>
                    <span className="font-mono font-bold">+₦{s.price.toLocaleString()}</span>
                  </div>
                ))}
                {/* Optional services breakdown */}
                {services.filter((s: any) => !s.isCompulsory && selectedServices.includes(s.id)).map((s: any) => {
                  const isBus = s.type === 'bus';
                  const chosenRoute = isBus ? busRoutes.find((r: any) => r.id === selectedBusRouteId) : null;
                  const price = chosenRoute ? chosenRoute.price : s.price;
                  return (
                    <div key={s.id} className="flex justify-between items-center py-2 pt-2">
                      <span className="text-slate-300">
                        {s.name}
                        {chosenRoute && <span className="block text-[9px] text-amber-400 font-normal">Route: {chosenRoute.route}</span>}
                      </span>
                      <span className="font-mono font-bold">+₦{price.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 md:mt-0 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Estimated Total</span>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white">₦{calculateTotal().toLocaleString()}</div>
                  <span className="text-[10px] text-amber-500 font-medium font-sans">per academic term (3 terms per year)</span>
                </div>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg flex items-start space-x-2 text-[10px] text-slate-300 border border-slate-750 font-sans">
                <Info className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Financial aid schemas and multi-sibling discounts (up to 15%) are computed inside classroom counseling sessions.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Application Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="admissions-procedure-block">
          {/* Instructions Column */}
          <div className="lg:col-span-4 space-y-6 bg-slate-900 text-slate-100 p-6 sm:p-8 rounded-2xl">
            <h3 className="font-extrabold text-lg text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
              <ClipboardList className="w-5 h-5 text-amber-500" />
              <span>Application Procedure</span>
            </h3>
            
            <ul className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300">
              <li className="flex items-start space-x-3.5">
                <span className="w-6 h-6 bg-amber-500 text-slate-950 font-black flex items-center justify-center rounded-lg text-xs shrink-0 select-none">1</span>
                <div>
                  <h4 className="font-bold text-white mb-0.5">File Application</h4>
                  <p className="text-slate-400 text-xs">Fill out child details and prospective parents info inside the form on the right.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3.5">
                <span className="w-6 h-6 bg-amber-500 text-slate-950 font-black flex items-center justify-center rounded-lg text-xs shrink-0 select-none">2</span>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Faculty Counseling</h4>
                  <p className="text-slate-400 text-xs">If basic checklist targets align, we will schedule a warm, 30-minute campus visit.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3.5">
                <span className="w-6 h-6 bg-amber-500 text-slate-950 font-black flex items-center justify-center rounded-lg text-xs shrink-0 select-none">3</span>
                <div>
                  <h4 className="font-bold text-white mb-0.5">School Registration</h4>
                  <p className="text-slate-400 text-xs">Finalizing enrollment documents with Mrs. Jenkins and welcoming your child!</p>
                </div>
              </li>
            </ul>

            <div className="p-4 bg-slate-800 border border-slate-750 rounded-xl text-xs space-y-2">
              <p className="text-amber-400 font-bold">Require Assistance?</p>
              <p className="text-slate-300 text-[11px]">
                Reach out directly via admissions office lines: <strong>+1 (555) 345-6789</strong>. Our physical advisory hours operate Mon-Fri 8am to 4pm.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-905 mb-6">Apply for Admission</h3>
            
            {success && (
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-900 rounded-xl p-4 mb-6 flex items-start space-x-3 animate-fade-in">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">Filing Registered Successfully!</p>
                  <p className="text-xs text-emerald-700">Thank you for your trust in Grace Junior Academy. We have cataloged your dynamic request and placed it under review. You can track this below.</p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div id="admissions-error-banner" className="bg-red-50 border border-red-200 text-red-900 rounded-xl p-4 mb-6 flex items-start space-x-3 animate-fade-in">
                <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold text-sm flex justify-between items-center">
                    <span>Validation & Entry Error</span>
                    <button 
                      type="button" 
                      onClick={() => setErrorMsg('')}
                      className="text-red-500 hover:text-red-700 font-bold text-xs select-none cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                  <p className="text-xs text-red-700 mt-1">{errorMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-6 text-sm" id="admission-form-element">
              {/* Part 1: Student Particulars */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                  1. Child Particulars
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-1">
                  {/* Left Column - Fields */}
                  <div className="md:col-span-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-750">Child Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="e.g. Liam Sterling Vance"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-750">Date of Birth *</label>
                        <input 
                          type="date" 
                          required 
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-750">Gender *</label>
                        <select 
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-750">Class Applied For *</label>
                        <select 
                          value={targetGrade}
                          onChange={(e) => setTargetGrade(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                        >
                          {(() => {
                            const saved = localStorage.getItem('gja_classes_db');
                            let classesList = ['Early Years (Playclass to Nursery 2)', 'Lower Primary Primary 1-3', 'Upper Primary Primary 4-6'];
                            if (saved) {
                              try {
                                const parsed = JSON.parse(saved);
                                if (Array.isArray(parsed) && parsed.length > 0) {
                                  classesList = parsed;
                                }
                              } catch (e) {}
                            }
                            return classesList.map(cls => (
                              <option key={cls} value={cls}>{cls}</option>
                            ));
                          })()}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Passport Upload Box with Drag & Drop */}
                  <div className="md:col-span-4 flex flex-col justify-between">
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`flex-1 flex flex-col items-center justify-center p-3 border-2 border-dashed rounded-2xl transition duration-200 min-h-[140px] text-center ${
                        dragActive 
                          ? 'border-amber-500 bg-amber-50/40' 
                          : passport 
                          ? 'border-slate-200 bg-slate-50/30' 
                          : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Child Passport</label>
                      
                      {passport ? (
                        <div className="relative group w-20 h-24 border border-slate-200 rounded-lg overflow-hidden shadow-xs bg-white">
                          <img src={passport} alt="Child Photograph" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setPassport('')}
                            className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center shadow-xs cursor-pointer transition opacity-100 sm:opacity-0 group-hover:opacity-100"
                            title="Remove Photo"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 py-1">
                          <UserPlus className={`w-7 h-7 text-slate-300 ${dragActive ? 'scale-110 text-amber-500' : ''} transition duration-200`} />
                          <span className="text-[10px] mt-1 text-slate-400">Drag photo here, or</span>
                        </div>
                      )}

                      <div className="mt-2 w-full">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 2 * 1024 * 1024) {
                                setErrorMsg("File is too large. Please upload an image under 2MB.");
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setPassport(event.target.result as string);
                                  setErrorMsg('');
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden" 
                          id="passport-file-input"
                        />
                        <label 
                          htmlFor="passport-file-input"
                          className="inline-block text-center bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[10px] py-1 px-3 rounded-lg shadow-xs cursor-pointer transition select-none"
                        >
                          {passport ? 'Change Photo' : 'Select File'}
                        </label>
                        <p className="text-[9px] text-slate-400 mt-1">PNG, JPG (Max 2MB)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pb-1">
                  <label className="text-xs font-bold text-slate-750">Prospective Enrolled Term *</label>
                  <select 
                    value={enrolledTerm}
                    onChange={(e) => setEnrolledTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                  >
                    <option value="1st Term 2026/2027">1st Term 2026/2027</option>
                    <option value="2nd Term 2026/2027">2nd Term 2026/2027</option>
                    <option value="3rd Term 2026/2027">3rd Term 2026/2027</option>
                  </select>
                </div>
              </div>

              {/* Part 2: Parent Information */}
              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                  2. Parent / Legal Guardian Particulars
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Parent/Guardian Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Richard Vance"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Relationship to Child *</label>
                    <select 
                      value={guardianRelationship}
                      onChange={(e) => setGuardianRelationship(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Step-Parent">Step-Parent</option>
                      <option value="Grandparent">Grandparent</option>
                      <option value="Uncle/Aunt">Uncle/Aunt</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                      <option value="Financial Sponsor">Financial Sponsor</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Contact Mobile Number *</label>
                    <input 
                      type="tel" 
                      required 
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="e.g. +1 (555) 123-4567"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Contact Email *</label>
                    <input 
                      type="email" 
                      required 
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="e.g. parents@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Residential Address *</label>
                    <input 
                      type="text" 
                      required 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 104 Applewood Ln, Springfield"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Parent Occupation / Profession</label>
                    <input 
                      type="text" 
                      value={parentOccupation}
                      onChange={(e) => setParentOccupation(e.target.value)}
                      placeholder="e.g. Software Engineer"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Part 3: Secondary Information */}
              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                  3. Emergency Clinical & Extra Particulars
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Previous School Attended (If any)</label>
                    <input 
                      type="text" 
                      value={prevSchool}
                      onChange={(e) => setPrevSchool(e.target.value)}
                      placeholder="e.g. Springfield Kinderland Care"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Known Allergies (If none, leave 'None')</label>
                    <input 
                      type="text" 
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      placeholder="e.g. Peanuts, Penicillin"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Blood Group</label>
                    <select 
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    >
                      <option value="Unspecified">Unspecified/Unknown</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Genotype</label>
                    <select 
                      value={genotype}
                      onChange={(e) => setGenotype(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    >
                      <option value="Unspecified">Unspecified/Unknown</option>
                      <option value="AA">AA</option>
                      <option value="AS">AS</option>
                      <option value="SS">SS</option>
                      <option value="AC">AC</option>
                      <option value="SC">SC</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Emergency Liaison Full Name</label>
                    <input 
                      type="text" 
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      placeholder="e.g. Uncle Arthur Dent"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-750">Emergency Contact Phone Number</label>
                    <input 
                      type="tel" 
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      placeholder="e.g. +1 (555) 987-6543"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-750">Special Considerations / Medical Notes</label>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Has mild asthma, carries inhaler"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-extrabold py-3.5 rounded-xl shadow-md transition duration-305 select-none text-sm cursor-pointer"
                >
                  Submit Official Registration Application
                </button>

                <button
                  type="button"
                  onClick={() => generatePDF()}
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 font-bold py-3 rounded-xl border border-slate-300 hover:border-slate-400 shadow-xs transition duration-200 select-none text-xs flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Download Draft Application (PDF Format)</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Local applications tracker List */}
        {applications.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6" id="personal-admissions-logs">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
              <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
              <h3 className="font-extrabold text-lg text-slate-900">Your Submitted Applications Tracker</h3>
            </div>

            <div className="divide-y divide-slate-100">
              {applications.map((app, index) => (
                <div key={index} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <p className="font-extrabold text-slate-950">{app.studentName}</p>
                    <p className="text-slate-500 text-xs">
                      Target Grade: <strong>{app.targetGrade}</strong> • Parent: {app.parentName}
                    </p>
                    <p className="text-slate-400 text-[10px]">
                      Filed On: {app.dateSubmitted}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => generatePDF(app)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition select-none cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Download PDF</span>
                    </button>
                    <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200/50 text-amber-800 py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider select-none">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      <span>{app.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 italic">
              * Tracker is securely saved in your browser storage. If you refresh or clear your cache, offline logs are archived. Our registrars will follow up via the parent email provided within 48 business hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
