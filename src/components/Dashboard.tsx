import React, { useState, useRef, useEffect } from 'react'
import { User, LogOut, ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import loginImage from './1.png';
import profile from './2.jpg';

interface DashboardProps {
  onLogout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('profile')
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const registrationOptions = [
    'Rules and Regulations',
    'Submit Registration',
    'Proof of Registration',
    'Add Subjects to a Registration',
    'Proof and Cost',
    'Subject Cancellation',
    'Registration Restrictions',
    'Register Your Programme'
  ]

  const sidebarItems = [
    { name: 'Application', hasDropdown: false },
    { name: 'Registration', hasDropdown: true, options: registrationOptions },
    { name: 'Residence Application', hasDropdown: false },
    { name: 'Residence Registration', hasDropdown: false },
    { name: 'Student Admin', hasDropdown: false },
    { name: 'Financial Aid', hasDropdown: false },
    { name: 'Student Enquiry', hasDropdown: false },
    { name: 'E-Payments', hasDropdown: false },
    { name: 'MyGate Online Payment', hasDropdown: false },
    { name: 'Maintain Banking details', hasDropdown: false },
    { name: 'Request For Information', hasDropdown: false },
    { name: 'Student Finance', hasDropdown: false },
    { name: 'Medical Web', hasDropdown: false },
    { name: 'OPAC', hasDropdown: false }
  ]

  const quickActions = [
    { title: 'School Leaving Information', color: 'bg-blue-400' },
    { title: 'Application Information', color: 'bg-blue-400' },
    { title: 'Registration Information', color: 'bg-blue-400' },
    { title: 'Residence Information', color: 'bg-blue-400' },
    { title: 'Financial Information', color: 'bg-blue-400' }
  ]

  const studentData = {
    studentNbr: '******',
    gender: '***',
    birthdate: '***',
    idNbr: '***',
    maritalStatus: '***',
    homeLang: '***',
    citizenship: '***',
    emailAddress: '***',
    cellphone: '***',
    postalAddress: '***'
  }

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }))
  }

  const handleOptionClick = (option: string) => {
    setActiveSection(`registration-${option.toLowerCase().replace(/\s+/g, '-')}`)
    setIsMobileMenuOpen(false) // Close mobile menu when option is selected
  }

  const handleSidebarItemClick = (itemName: string) => {
    if (sidebarItems.find(item => item.name === itemName)?.hasDropdown) {
      toggleExpanded(itemName)
    } else {
      setActiveSection(itemName.toLowerCase().replace(/\s+/g, '-'))
      setIsMobileMenuOpen(false) // Close mobile menu when item is selected
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExpandedItems({})
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 px-4 py-1">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <img 
              src={loginImage}
              className="w-8 h-8 sm:w-12 sm:h-12 rounded"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700">UNIVERSITY OF GHANA</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 hidden sm:block">
            Thursday, 26th June 2025
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto relative">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`w-64 bg-white border-r border-gray-300 transition-transform duration-300 ease-in-out md:translate-x-0 z-50 flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0 fixed h-screen top-0' : '-translate-x-full fixed md:relative h-screen md:h-auto md:min-h-screen'
        }`} ref={dropdownRef}>
          <div className="bg-blue-500 text-white px-4 py-2 text-center font-medium text-sm flex-shrink-0">
            Student iEnabler
          </div>
          
          <nav className="p-2 flex-1 overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            {sidebarItems.map((item, index) => (
              <div key={index} className="mb-1">
                <button
                  onClick={() => handleSidebarItemClick(item.name)}
                  className={`w-full text-left px-3 py-4 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 flex items-center justify-between ${
                    activeSection === item.name.toLowerCase().replace(/\s+/g, '-') 
                      ? 'bg-blue-100 text-blue-700 rounded font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {item.hasDropdown ? (
                      expandedItems[item.name] ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                    {item.name}
                  </span>
                </button>

                {/* Registration Dropdown */}
                {item.hasDropdown && expandedItems[item.name] && (
                  <div className="ml-4 mt-1 bg-gray-50 border-l-2 border-blue-200">
                    {item.options?.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionClick(option)}
                        className={`w-full text-left px-3 py-3 text-xs hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 ${
                          activeSection === `registration-${option.toLowerCase().replace(/\s+/g, '-')}`
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                    
                    {/* Process Status and Options sub-items */}
                    <div className="ml-2 border-l border-gray-300">
                      <button
                        onClick={() => handleOptionClick('Process Status')}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 ${
                          activeSection === 'registration-process-status'
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600'
                        }`}
                      >
                        Process Status
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="border-t border-gray-300 p-2 flex-shrink-0">
            <button
              onClick={onLogout}
              className="w-full text-left px-3 py-4 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 md:ml-0">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Left Column - Student Profile */}
            <div className="xl:col-span-1 order-1 xl:order-1">
              <div className="bg-white border border-gray-300 shadow-md pt-0 p-4">
                <div className="text-center mb-4">
                  <div className="w-32 h-40 sm:w-40 sm:h-50 bg-gray-200 mx-auto mb-3 flex items-center justify-center border">
                    <img
                      src={profile}
                      className="w-32 h-40 sm:w-40 sm:h-50 text-gray-400 object-cover" 
                      />
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Student Nbr</span>
                    <span>{studentData.studentNbr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Gender</span>
                    <span>{studentData.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Birthdate</span>
                    <span>{studentData.birthdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">ID Nbr</span>
                    <span>{studentData.idNbr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Marital Status</span>
                    <span>{studentData.maritalStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Home Lang</span>
                    <span>{studentData.homeLang}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Citizenship</span>
                    <span>{studentData.citizenship}</span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 space-y-2">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded transition-colors duration-200">
                    Email Address
                  </button>
                  <div className="text-center text-xs sm:text-sm text-gray-600 break-all">
                    {studentData.emailAddress}
                  </div>
                  
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded transition-colors duration-200">
                    Cellphone
                  </button>
                  <div className="text-center text-xs sm:text-sm text-gray-600">
                    {studentData.cellphone}
                  </div>
                  
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded transition-colors duration-200">
                    Postal Address
                  </button>
                  <div className="text-center text-xs sm:text-sm text-gray-600 break-words">
                    {studentData.postalAddress}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="xl:col-span-2 order-2 xl:order-2">
              <div className="grid gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`${action.color} hover:bg-blue-500 text-white p-4 rounded text-left font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg`}
                  >
                    {action.title}
                  </button>
                ))}
              </div>

              {/* Content Area for Selected Registration Option */}
              {activeSection.startsWith('registration-') && (
                <div className="mt-6 bg-white border border-gray-300 p-6">
                  <h2 className="text-lg font-medium text-gray-800 mb-4">
                    {activeSection.replace('registration-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h2>
                  <div className="text-gray-600">
                    <p>This section contains information and functionality for:</p>
                    <p className="font-medium mt-2">
                      {activeSection.replace('registration-', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <p className="mt-4 text-sm">
                      Content for this registration option will be displayed here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard