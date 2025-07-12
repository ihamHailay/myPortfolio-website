"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Github,
  Linkedin,
  ExternalLink,
  Code,
  GraduationCap,
  Menu,
  X,
  Award,
  Users,
  Star,
  Download,
  Briefcase,
  Target,
  Zap,
  Instagram,
  Facebook,
  Shield,
  Heart,
  Brain,
  BookOpen,
  TrendingUp,
  Copy,
  Check,
  CheckCircle,
  AlertCircle,
  PhoneCall,
  Mail,
  MapPin,
  Send,
} from "lucide-react"

// Types for better type safety
interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  type: "success" | "error" | null
  message: string
}

interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  status: "Live" | "Beta" | "Development"
}

interface Certification {
  name: string
  issuer: string
  date: string
  type: string
  credentialId: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
  bgColor: string
  verifyUrl: string
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const [copiedText, setCopiedText] = useState("")
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: null, message: "" })
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Memoized data to prevent unnecessary re-renders
  const socialLinks = useMemo(
    () => ({
      github: "https://github.com/mahderhailay",
      linkedin: "https://linkedin.com/in/mahder-hailay",
      facebook: "https://facebook.com/mahder.hailay",
      instagram: "https://instagram.com/mahder_hailay",
      email: "mailto:abadimahder2415@gmail.com",
      phone: "tel:+251982195210",
    }),
    [],
  )

  const projects: Project[] = useMemo(
    () => [
      {
        title: "ExplorET Mobile App",
        description: "Comprehensive tourism platform for Ethiopian destinations with real-time location services.",
        tech: ["React Native", "Node.js", "Python", "MongoDB"],
        github: "https://github.com/mahderhailay/exploret",
        demo: "https://exploret-demo.vercel.app",
        status: "Live",
      },
      {
        title: "Hotel Booking System",
        description: "Full-stack reservation platform with real-time availability and payment processing.",
        tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
        github: "https://github.com/mahderhailay/hotel-booking",
        demo: "https://hotel-booking-demo.vercel.app",
        status: "Live",
      },
      {
        title: "Shade Finder Application",
        description: "AI-powered geolocation app for finding optimal shade locations using environmental data.",
        tech: ["Vue.js", "Flask", "TensorFlow", "Mapbox"],
        github: "https://github.com/mahderhailay/shade-finder",
        demo: "https://shade-finder-demo.vercel.app",
        status: "Beta",
      },
      {
        title: "School Management System",
        description: "Comprehensive educational platform handling student records and administrative operations.",
        tech: ["JavaScript", "MySQL", "PHP", "Bootstrap"],
        github: "https://github.com/mahderhailay/school-management",
        demo: "https://school-mgmt-demo.vercel.app",
        status: "Live",
      },
    ],
    [],
  )

  const certifications: Certification[] = useMemo(
    () => [
      {
        name: "Training of Trainers in MHPSS",
        issuer: "UNICEF",
        date: "2024",
        type: "Mental Health & Psychosocial Support",
        credentialId: "UNICEF-MHPSS-2024",
        description:
          "Advanced training in mental health support and psychosocial interventions for vulnerable populations",
        icon: Heart,
        color: "from-pink-500 to-rose-500",
        bgColor: "from-pink-50 to-rose-50",
        verifyUrl: "https://unicef.org/verify/UNICEF-MHPSS-2024",
      },
      {
        name: "Training of Trainers in CPMS",
        issuer: "TBST",
        date: "2024",
        type: "Child Protection",
        credentialId: "TBST-CPMS-2024",
        description: "Child Protection Minimum Standards training and certification for safeguarding children",
        icon: Shield,
        color: "from-blue-500 to-cyan-500",
        bgColor: "from-blue-50 to-cyan-50",
        verifyUrl: "https://tbst.org/verify/TBST-CPMS-2024",
      },
      {
        name: "Mindfulness Based Stress Reduction (MBSR)",
        issuer: "Certified Program",
        date: "2023",
        type: "Wellness & Mental Health",
        credentialId: "MBSR-2023",
        description:
          "8-week intensive mindfulness and stress reduction program for personal and professional development",
        icon: Brain,
        color: "from-purple-500 to-violet-500",
        bgColor: "from-purple-50 to-violet-50",
        verifyUrl: "https://mbsr-program.org/verify/MBSR-2023",
      },
      {
        name: "Training of Trainers in PSEA",
        issuer: "UN Women",
        date: "2023",
        type: "Protection from Sexual Exploitation",
        credentialId: "UNW-PSEA-2023",
        description: "Prevention of Sexual Exploitation and Abuse training for humanitarian and development work",
        icon: Shield,
        color: "from-emerald-500 to-teal-500",
        bgColor: "from-emerald-50 to-teal-50",
        verifyUrl: "https://unwomen.org/verify/UNW-PSEA-2023",
      },
      {
        name: "STEM Certificate",
        issuer: "AdU & MIT",
        date: "2023",
        type: "Science, Technology, Engineering & Mathematics",
        credentialId: "STEM-MIT-2023",
        description: "Comprehensive STEM education and methodology certification from prestigious institutions",
        icon: Code,
        color: "from-orange-500 to-red-500",
        bgColor: "from-orange-50 to-red-50",
        verifyUrl: "https://mit.edu/verify/STEM-MIT-2023",
      },
      {
        name: "Reach Up! Programme and Coaching",
        issuer: "DOTEthiopia",
        date: "2023",
        type: "Professional Development",
        credentialId: "DOT-REACH-2023",
        description: "Leadership development and professional coaching program for career advancement",
        icon: TrendingUp,
        color: "from-indigo-500 to-purple-500",
        bgColor: "from-indigo-50 to-purple-50",
        verifyUrl: "https://dotethiopia.org/verify/DOT-REACH-2023",
      },
      {
        name: "Teen STAR Program",
        issuer: "Ethiopian Catholic Secretariat",
        date: "2022",
        type: "Youth Development",
        credentialId: "ECS-TEEN-2022",
        description: "Youth leadership and community engagement program focusing on social responsibility",
        icon: Users,
        color: "from-green-500 to-emerald-500",
        bgColor: "from-green-50 to-emerald-50",
        verifyUrl: "https://catholic-secretariat.org/verify/ECS-TEEN-2022",
      },
      {
        name: "Business Administration Course",
        issuer: "Mekelle University and DISH Program",
        date: "2022",
        type: "Business Management",
        credentialId: "MU-BA-2022",
        description: "Comprehensive business administration and management principles for entrepreneurial success",
        icon: BookOpen,
        color: "from-amber-500 to-orange-500",
        bgColor: "from-amber-50 to-orange-50",
        verifyUrl: "https://mu.edu.et/verify/MU-BA-2022",
      },
    ],
    [],
  )

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const sections = ["home", "about", "resume", "portfolio", "services", "contact", "certifications"]
    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    // Throttled scroll handler for better performance
    let timeoutId: NodeJS.Timeout
    const throttledScrollHandler = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 16) // ~60fps
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    // Observe all sections
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    window.addEventListener("scroll", throttledScrollHandler, { passive: true })

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler)
      observer.disconnect()
      clearTimeout(timeoutId)
    }
  }, [handleScroll])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }, [])

  // Handle form input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
      // Clear form status when user starts typing
      if (formStatus.type) {
        setFormStatus({ type: null, message: "" })
      }
    },
    [formStatus.type],
  )

  // Handle contact form submission - Direct Formspree for Cloudflare Pages
  const handleContactSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setFormStatus({ type: null, message: "" })

      try {
        // Direct Formspree submission for static sites
        const response = await fetch("https://formspree.io/f/xpznvqko", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _replyto: formData.email,
            _subject: `Portfolio Contact: ${formData.subject}`,
          }),
        })

        if (response.ok) {
          setFormStatus({
            type: "success",
            message: "Message sent successfully! I'll get back to you within 24-48 hours.",
          })
          // Reset form on success
          setFormData({ name: "", email: "", subject: "", message: "" })
        } else {
          throw new Error("Failed to send message")
        }
      } catch (error) {
        console.error("Contact form error:", error)

        // Fallback to mailto
        const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`)
        const mailtoBody = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Portfolio Website
${new Date().toLocaleString()}
        `)

        setFormStatus({
          type: "success",
          message: "Opening your email client to send the message directly...",
        })

        // Open mailto link as fallback
        setTimeout(() => {
          window.location.href = `mailto:abadimahder2415@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`
        }, 1000)

        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" })
      } finally {
        setIsLoading(false)
      }
    },
    [formData],
  )

  // Handle resume download
  const handleResumeDownload = useCallback(() => {
    const resumeData = `
MAHDER HAILAY - SOFTWARE ENGINEER & IT SPECIALIST

Contact Information:
- Email: abadimahder2415@gmail.com
- Phone: +251-982-1952-10
- Location: Semit72, Bole, Addis Ababa, Ethiopia
- LinkedIn: linkedin.com/in/mahder-hailay
- GitHub: github.com/mahderhailay

EDUCATION:
Bachelor of Science in Information Technology
Mekelle University (MIT Campus) | 2018 - 2025 | GPA: 3.89/4.0

TECHNICAL EXPERIENCE:
1. Full-Stack Web Developer & Figma Designer Intern
   Timeless Technologies | Nov 2024 – Feb 2025
   - Developed 8+ responsive web applications
   - Created 25+ UI/UX prototypes with 98% approval rate

2. Senior UI/UX Designer
   StudCare PLC | 2024
   - Redesigned healthcare platform for 15,000+ users
   - Increased user engagement by 65%

3. Web Developer
   Save the Children International | 2024
   - Built attendance system for 600+ daily check-ins
   - Achieved 99.9% system uptime

TECHNICAL SKILLS:
- Programming: JavaScript, TypeScript, Python, Java, C++
- Frontend: React.js, Vue.js, Next.js, HTML5/CSS3, Tailwind CSS
- Backend: Node.js, Express.js, Flask, MySQL, PostgreSQL, MongoDB
- Design: Figma, Adobe XD, Canva, UI/UX Design
- Tools: Git/GitHub, Docker, AWS, Network Design

CERTIFICATIONS:
- Training of Trainers in MHPSS - UNICEF (2024)
- STEM Certificate - AdU & MIT (2023)
- Business Administration - Mekelle University (2022)
- And 5 more professional certifications

PROJECTS:
- ExplorET Mobile App (React Native, Node.js, Python)
- Hotel Booking System (React, Node.js, PostgreSQL)
- Shade Finder Application (Vue.js, Flask, TensorFlow)
- School Management System (JavaScript, MySQL, PHP)

For complete details, visit: mahderhailay.dev
    `

    const blob = new Blob([resumeData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "Mahder_Hailay_Resume.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Show success message
    alert("Resume downloaded successfully!")
  }, [])

  // Handle copy to clipboard
  const handleCopyToClipboard = useCallback(async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(type)
      setTimeout(() => setCopiedText(""), 2000)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopiedText(type)
      setTimeout(() => setCopiedText(""), 2000)
    }
  }, [])

  // Handle social media links
  const handleSocialClick = useCallback(
    (platform: keyof typeof socialLinks) => {
      window.open(socialLinks[platform], "_blank", "noopener,noreferrer")
    },
    [socialLinks],
  )

  // Handle project links
  const handleProjectDemo = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }, [])

  const handleProjectGithub = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Enhanced with functional buttons */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with click to home */}
            <button
              onClick={() => scrollToSection("home")}
              className="font-semibold text-lg text-gray-900 animate-fade-in hover:text-orange-500 transition-colors duration-300"
            >
              My Portfolio
            </button>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center space-x-8">
              {["Home", "About", "Resume", "Portfolio", "Services", "Contact", "Certifications"].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`nav-link text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.toLowerCase()
                      ? "text-orange-500 scale-105"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Social Icons with functional links */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick("facebook")}
                className="w-8 h-8 p-0 text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 hover:rotate-6 font-body font-medium"
                title="Visit Facebook Profile"
              >
                <Facebook size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick("instagram")}
                className="w-8 h-8 p-0 text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 hover:rotate-6 font-body font-medium"
                title="Visit Instagram Profile"
              >
                <Instagram size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick("linkedin")}
                className="w-8 h-8 p-0 text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 hover:rotate-6 font-body font-medium"
                title="Visit LinkedIn Profile"
              >
                <Linkedin size={16} />
              </Button>
            </div>

            {/* Mobile Navigation Button */}
            <div className="lg:hidden">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}>
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu with functional buttons */}
          <div
            className={`lg:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 border-t border-gray-100">
              {["Home", "About", "Resume", "Portfolio", "Services", "Contact", "Certifications"].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-3 px-4 text-sm font-medium text-gray-700 hover:text-orange-500 transition-all duration-300 hover:translate-x-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item}
                </button>
              ))}
              <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("facebook")}
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 font-body font-medium"
                  title="Visit Facebook"
                >
                  <Facebook size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("instagram")}
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 font-body font-medium"
                  title="Visit Instagram"
                >
                  <Instagram size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("linkedin")}
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 font-body font-medium"
                  title="Visit LinkedIn"
                >
                  <Linkedin size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced with functional buttons */}
      <section id="home" className="pt-16 min-h-screen bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-4rem)]">
            {/* Left Content - Staggered animations */}
            <div className="space-y-8 lg:pr-8">
              <div className="space-y-6">
                <h1 className="font-heading text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-slide-up tracking-tight">
                  <span className="inline-block animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    Crafting Digital Experiences
                  </span>
                  <br />
                  <span className="text-gray-700 inline-block animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    with Passion
                  </span>
                </h1>
                <p
                  className="font-body text-lg text-gray-600 leading-relaxed max-w-lg animate-fade-in"
                  style={{ animationDelay: "0.6s" }}
                >
                  Building scalable web services & automations to bring your ideas to life with purpose and precision
                </p>
              </div>

              {/* CTA Buttons with functional actions */}
              <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
                <Button
                  onClick={() => scrollToSection("portfolio")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-body font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  View My Work
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-body font-medium text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  Let's Connect
                </Button>
              </div>

              {/* Stats with interactive hover */}
              <div className="flex items-center space-x-12 pt-8 animate-fade-in" style={{ animationDelay: "1s" }}>
                {[
                  { number: "5+", label: "Years Experience" },
                  { number: "20+", label: "Projects Completed" },
                  { number: "15+", label: "Happy Clients" },
                ].map((stat, index) => (
                  <div key={index} className="group cursor-pointer" onClick={() => scrollToSection("about")}>
                    <div className="font-heading text-4xl font-bold text-gray-900 mb-1 transition-all duration-300 group-hover:text-orange-500 group-hover:scale-110">
                      {stat.number}
                    </div>
                    <div className="font-body text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Interactive image */}
            <div className="relative lg:pl-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {/* Background Organic Shape with pulse animation */}
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-50 rounded-full opacity-60 animate-pulse"></div>

              {/* Code Snippets with click to copy */}
              <button
                onClick={() => handleCopyToClipboard("Hello, World!", "hello")}
                className="absolute -top-8 right-8 text-4xl font-mono text-teal-600 opacity-30 select-none animate-bounce hover:opacity-50 transition-opacity duration-300"
                title="Click to copy"
              >
                {copiedText === "hello" ? "Copied!" : "Hello, World!"}
              </button>
              <button
                onClick={() => handleCopyToClipboard('print("Hello World!");', "print")}
                className="absolute bottom-8 -left-4 text-lg font-mono text-teal-600 opacity-40 select-none animate-pulse hover:opacity-60 transition-opacity duration-300"
                title="Click to copy"
              >
                {copiedText === "print" ? "Copied!" : 'print("Hello World!");'}
              </button>

              {/* Main Image Container with click action */}
              <div className="relative z-10 group">
                <button
                  onClick={() => scrollToSection("about")}
                  className="w-full bg-gradient-to-br from-orange-50 to-blue-50 rounded-3xl p-8 shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:scale-105"
                >
                  <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl">
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                      {/* Professional Photo Area */}
                      <div className="absolute inset-4 bg-gradient-to-br from-orange-100 to-blue-100 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                            <span className="text-white font-bold text-xl">MH</span>
                          </div>
                          <h3 className="font-heading text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">
                            Mahder Hailay
                          </h3>
                          <p className="font-body text-gray-600 text-sm">Software Engineer</p>
                        </div>
                      </div>

                      {/* Floating desk items with animations */}
                      <div className="absolute bottom-4 left-4 w-8 h-6 bg-gray-300 rounded opacity-60 animate-pulse"></div>
                      <div className="absolute bottom-4 right-4 w-6 h-8 bg-green-400 rounded-full opacity-60 animate-bounce"></div>
                      <div className="absolute top-4 right-4 w-4 h-8 bg-yellow-400 rounded opacity-60 animate-pulse"></div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Bottom Organic Shape */}
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-50 rounded-full opacity-40 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with functional contact buttons */}
      <section
        id="about"
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
          isVisible.about ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4 animate-fade-in">About Me</h2>
            <p
              className="font-body text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Passionate Software Engineer & IT Specialist dedicated to creating impactful digital solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="prose prose-lg max-w-none">
                <p className="font-body text-gray-600 leading-relaxed">
                  I'm a passionate Software Engineer and IT Specialist with over 5 years of hands-on experience in
                  full-stack development, system automation, and UI/UX design. Currently pursuing my Bachelor's degree
                  in Information Technology at Mekelle University with a strong GPA of 3.89.
                </p>
                <p className="font-body text-gray-600 leading-relaxed">
                  My expertise spans across modern web technologies including React, Node.js, Python, and cloud
                  platforms. I've successfully delivered 20+ projects ranging from mobile applications to enterprise
                  systems.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="group cursor-pointer">
                  <h4 className="font-heading font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-orange-500">
                    Location
                  </h4>
                  <button
                    onClick={() =>
                      window.open(
                        "https://maps.google.com/?q=Semit72,Bole,Addis+Ababa,Ethiopia",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    className="font-body text-gray-600 hover:text-orange-500 transition-colors duration-300 text-left"
                  >
                    Addis Ababa, Ethiopia
                  </button>
                </div>
                <div className="group cursor-pointer">
                  <h4 className="font-heading font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-orange-500">
                    Email
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSocialClick("email")}
                      className="font-body text-gray-600 hover:text-orange-500 transition-colors duration-300"
                    >
                      abadimahder2415@gmail.com
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyToClipboard("abadimahder2415@gmail.com", "email")}
                      className="w-6 h-6 p-0 hover:bg-orange-100 font-body font-medium"
                      title="Copy email"
                    >
                      {copiedText === "email" ? <Check size={12} /> : <Copy size={12} />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <Card className="p-6 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-4">Technical Skills</h3>
                <div className="space-y-4">
                  {[
                    { name: "JavaScript/TypeScript", level: 95 },
                    { name: "React/Next.js", level: 90 },
                    { name: "Node.js", level: 85 },
                    { name: "Python", level: 80 },
                  ].map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between mb-2">
                        <span className="font-body text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors duration-300">
                          {skill.name}
                        </span>
                        <span className="font-body text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden cursor-pointer">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000 hover:from-orange-400 hover:to-red-400"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${index * 200}ms`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section with functional download button */}
      <section
        id="resume"
        className={`py-20 bg-white transition-all duration-1000 ${
          isVisible.resume ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4 animate-fade-in">Resume</h2>
            <p
              className="font-body text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              My professional journey and educational background
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Experience with clickable company links */}
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-8 flex items-center">
                <Briefcase className="mr-3 text-orange-500 animate-bounce" size={24} />
                Experience
              </h3>
              <div className="space-y-8">
                {[
                  {
                    title: "Full-Stack Web Developer",
                    company: "Timeless Technologies",
                    period: "Nov 2024 – Present",
                    description: "Leading development of responsive web applications and UI/UX designs.",
                    website: "https://timeless-tech.com",
                  },
                  {
                    title: "Senior UI/UX Designer",
                    company: "StudCare PLC",
                    period: "2024",
                    description: "Led UX improvements for healthcare applications serving 10,000+ users.",
                    website: "https://studcare.com",
                  },
                  {
                    title: "Web Developer",
                    company: "Save the Children International",
                    period: "2024",
                    description: "Developed attendance tracking system with real-time capabilities.",
                    website: "https://savethechildren.org",
                  },
                ].map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-8 border-l-2 border-orange-200 group hover:border-orange-400 transition-all duration-300"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-500 rounded-full transition-all duration-300 group-hover:scale-125 group-hover:bg-orange-600"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                      <h4 className="font-heading text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                        {exp.title}
                      </h4>
                      <button
                        onClick={() => window.open(exp.website, "_blank", "noopener,noreferrer")}
                        className="font-body text-orange-600 font-medium hover:text-orange-700 transition-colors duration-300 hover:underline"
                      >
                        {exp.company}
                      </button>
                      <p className="font-body text-sm text-gray-500 mb-2">{exp.period}</p>
                      <p className="font-body text-gray-600">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education with clickable university link */}
            <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-8 flex items-center">
                <GraduationCap className="mr-3 text-orange-500 animate-bounce" size={24} />
                Education
              </h3>
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                  <h4 className="font-heading text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    Bachelor of Science in Information Technology
                  </h4>
                  <button
                    onClick={() => window.open("https://mu.edu.et", "_blank", "noopener,noreferrer")}
                    className="font-body text-orange-600 font-medium hover:text-orange-700 transition-colors duration-300 hover:underline"
                  >
                    Mekelle University
                  </button>
                  <p className="font-body text-sm text-gray-500 mb-2">2018 - 2025</p>
                  <div className="flex items-center">
                    <Star className="text-yellow-500 mr-1 animate-pulse" size={16} />
                    <span className="font-semibold text-gray-900">GPA: 3.89/4.0</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                  <h4 className="font-heading text-lg font-semibold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    Quick Certifications Preview
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Training of Trainers in MHPSS - UNICEF",
                      "STEM Certificate - AdU & MIT",
                      "Business Administration - Mekelle University",
                    ].map((cert, index) => (
                      <div key={index} className="flex items-center group/item">
                        <Award
                          className="text-orange-500 mr-2 transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-12"
                          size={16}
                        />
                        <span className="font-body text-gray-600 text-sm group-hover/item:text-gray-800 transition-colors duration-300">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => scrollToSection("certifications")}
                    className="font-body text-sm text-orange-600 mt-3 hover:text-orange-700 transition-colors duration-300 hover:underline"
                  >
                    View all {certifications.length} certifications →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button
              onClick={handleResumeDownload}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-body font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <Download className="mr-2 animate-bounce" size={18} />
              Download Full Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Section with functional project links */}
      <section
        id="portfolio"
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
          isVisible.portfolio ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4 animate-fade-in">Portfolio</h2>
            <p
              className="font-body text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Showcase of my recent projects and technical achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden hover:-translate-y-4 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {project.title === "ExplorET Mobile App" ? (
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 relative overflow-hidden">
                    <img
                      src="/exploret-app.png"
                      alt="ExplorET Mobile App Interface"
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-100 text-green-700">{project.status}</Badge>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProjectDemo(project.demo)}
                        className="bg-white/90 hover:scale-110 transition-transform duration-300 font-body font-medium"
                        title="View Live Demo"
                      >
                        <ExternalLink size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProjectGithub(project.github)}
                        className="bg-white/90 hover:scale-110 transition-transform duration-300 font-body font-medium"
                        title="View Source Code"
                      >
                        <Github size={14} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Code size={48} className="text-orange-500 animate-pulse group-hover:animate-bounce" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`badge ${
                          project.status === "Live"
                            ? "bg-green-100 text-green-700"
                            : project.status === "Beta"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProjectDemo(project.demo)}
                        className="bg-white/90 hover:scale-110 transition-transform duration-300 font-body font-medium"
                        title="View Live Demo"
                      >
                        <ExternalLink size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProjectGithub(project.github)}
                        className="bg-white/90 hover:scale-110 transition-transform duration-300 font-body font-medium"
                        title="View Source Code"
                      >
                        <Github size={14} />
                      </Button>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="card-title text-xl text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="card-description text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-heading font-semibold text-sm mb-2 text-gray-900">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          className="badge bg-orange-100 text-orange-700 hover:bg-orange-200 transition-all duration-300 hover:scale-105 cursor-pointer"
                          style={{ animationDelay: `${techIndex * 100}ms` }}
                          onClick={() => window.open(`https://www.google.com/search?q=${tech}+documentation`, "_blank")}
                          title={`Learn more about ${tech}`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => handleProjectDemo(project.demo)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 hover:scale-105 font-body font-medium"
                    >
                      <ExternalLink className="mr-1" size={14} />
                      Live Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleProjectGithub(project.github)}
                      className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50 transition-all duration-300 hover:scale-105 font-body font-medium"
                    >
                      <Github className="mr-1" size={14} />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with clickable service cards */}
      <section
        id="services"
        className={`py-20 bg-white transition-all duration-1000 ${
          isVisible.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4 animate-fade-in">Services</h2>
            <p
              className="font-body text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Comprehensive digital solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Full-Stack Development",
                description: "End-to-end web application development using modern technologies and best practices.",
                icon: Code,
              },
              {
                title: "UI/UX Design",
                description: "Creating intuitive and engaging user interfaces with focus on user experience.",
                icon: Target,
              },
              {
                title: "System Integration",
                description: "Seamless integration of various systems and APIs for optimal performance.",
                icon: Zap,
              },
              {
                title: "Technical Consulting",
                description: "Expert advice on technology stack selection and architecture decisions.",
                icon: Users,
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-xl transition-all duration-500 border-0 bg-white hover:-translate-y-4 group animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => scrollToSection("contact")}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <service.icon className="text-orange-500 animate-pulse group-hover:animate-bounce" size={32} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-4">
                  {service.description}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent font-body font-medium"
                  onClick={(e) => {
                    e.stopPropagation()
                    scrollToSection("contact")
                  }}
                >
                  Get Quote
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section with verification links */}
      <section
        id="certifications"
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
          isVisible.certifications ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Professional Certifications
            </h2>
            <p
              className="font-body text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              My commitment to continuous learning and professional development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-500 border-0 bg-white hover:-translate-y-4 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br ${cert.bgColor}`}
                >
                  <cert.icon className={`text-white animate-pulse group-hover:animate-bounce`} size={32} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  {cert.name}
                </h3>
                <p className="font-body text-sm text-gray-500 mb-2">{cert.issuer}</p>
                <p className="font-body text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-4">
                  {cert.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-gray-500">{cert.date}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(cert.verifyUrl, "_blank", "noopener,noreferrer")}
                    className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent transition-all duration-300 hover:scale-105 font-body font-medium"
                    title="Verify Certification"
                  >
                    Verify
                    <ExternalLink className="ml-1" size={14} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with improved form handling */}
      <section
        id="contact"
        className={`py-20 bg-white transition-all duration-1000 ${
          isVisible.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4 animate-fade-in">Contact</h2>
            <p
              className="font-body text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Let's discuss your next project and bring your ideas to life
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Improved Contact Form */}
            <Card
              className="p-8 shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-6">Send Message</h3>

              {/* Form Status Messages */}
              {formStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg border flex items-center space-x-3 ${
                    formStatus.type === "success"
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  {formStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <p className="font-body text-sm">{formStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="font-body block text-sm font-medium text-gray-700 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className="bg-gray-50 focus:bg-white transition-all duration-300 focus:scale-105 font-body"
                    />
                  </div>
                  <div className="group">
                    <label className="font-body block text-sm font-medium text-gray-700 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email"
                      required
                      className="bg-gray-50 focus:bg-white transition-all duration-300 focus:scale-105 font-body"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="font-body block text-sm font-medium text-gray-700 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject of your message"
                    className="bg-gray-50 focus:bg-white transition-all duration-300 focus:scale-105 font-body"
                  />
                </div>
                <div className="group">
                  <label className="font-body block text-sm font-medium text-gray-700 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message"
                    rows={4}
                    required
                    className="bg-gray-50 focus:bg-white transition-all duration-300 focus:scale-105 font-body w-full rounded-md border-gray-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 p-3"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-body font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <h3 className="font-heading text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div
                  className="flex items-center space-x-3 group cursor-pointer"
                  onClick={() => handleSocialClick("phone")}
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-all duration-300">
                    <PhoneCall className="text-orange-500 animate-pulse group-hover:animate-bounce" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                      Phone
                    </h4>
                    <p className="font-body text-gray-600 group-hover:text-orange-500 transition-colors duration-300">
                      +251-982-1952-10
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-3 group cursor-pointer"
                  onClick={() => handleSocialClick("email")}
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-all duration-300">
                    <Mail className="text-orange-500 animate-pulse group-hover:animate-bounce" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                      Email
                    </h4>
                    <p className="font-body text-gray-600 group-hover:text-orange-500 transition-colors duration-300">
                      abadimahder2415@gmail.com
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-3 group cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=Semit72,Bole,Addis+Ababa,Ethiopia",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-all duration-300">
                    <MapPin className="text-orange-500 animate-pulse group-hover:animate-bounce" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                      Location
                    </h4>
                    <p className="font-body text-gray-600 group-hover:text-orange-500 transition-colors duration-300">
                      Semit72, Bole, Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex justify-center space-x-4 mt-8">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("facebook")}
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 font-body font-medium"
                  title="Visit Facebook"
                >
                  <Facebook size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("instagram")}
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 font-body font-medium"
                  title="Visit Instagram"
                >
                  <Instagram size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("linkedin")}
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 font-body font-medium"
                  title="Visit LinkedIn"
                >
                  <Linkedin size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick("github")}
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 font-body font-medium"
                  title="Visit GitHub"
                >
                  <Github size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="font-body text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mahder Hailay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
