import React, { useState } from 'react'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import loginImage from './1.png';
import Hat from './3.jpg';

interface LoginPageProps {
  onLogin: () => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    studentNumber: '',
    pin: '',
    userType: 'student'
  })
  const [showPin, setShowPin] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [validationStatus, setValidationStatus] = useState<Record<string, boolean>>({})

  const validateStudentNumber = (value: string) => {
    if (!value) return 'Student number is required'
    if (!/^\d{8}$/.test(value)) return 'Student number must be exactly 8 digits'
    if (value.startsWith('0')) return 'Student number cannot start with 0'
    return ''
  }

  const validatePin = (value: string) => {
    if (!value) return 'PIN is required'
    if (value.length < 4) return 'PIN must be at least 4 characters'
    return ''
  }

  const handleInputChange = (field: string, value: string) => {
    // Apply constraints - only allow numeric input for student number
    if (field === 'studentNumber') {
      value = value.replace(/\D/g, '').slice(0, 8)
    }

    setFormData(prev => ({ ...prev, [field]: value }))

    // Real-time validation feedback
    let error = ''
    if (field === 'studentNumber') {
      error = validateStudentNumber(value)
    } else if (field === 'pin') {
      error = validatePin(value)
    }

    setErrors(prev => ({ ...prev, [field]: error }))
    setValidationStatus(prev => ({ ...prev, [field]: !error && value.length > 0 }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const studentNumberError = validateStudentNumber(formData.studentNumber)
    const pinError = validatePin(formData.pin)
    
    const newErrors = {
      studentNumber: studentNumberError,
      pin: pinError
    }

    setErrors(newErrors)

    if (studentNumberError || pinError) {
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 1500)
  }

  const isFormValid = !errors.studentNumber && !errors.pin && 
                     formData.studentNumber && formData.pin

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-300 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 mt-4 sm:mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Left Panel - Prospective Students */}
          <div className="bg-white border shadow-md border-gray-300 order-2 lg:order-1">
            <div className="bg-blue-500 text-white px-4 py-2 text-center font-medium text-sm">
              Prospective Students
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-sm text-gray-700 mb-4">
                If you are a prospective student, not registered at this institution, please select the following option.
              </p>
              <div className="flex items-start gap-3 p-3 border border-gray-300 rounded">
                <img 
                  src={Hat}
                  className="w-6 h-6 sm:w-8 sm:h-8 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Apply, Register, Change personal information, get academic and other information and make payments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Registered Users Login */}
          <div className="bg-white border shadow-md border-gray-300 order-1 lg:order-2">
            <div className="bg-blue-500 text-white px-4 py-2 text-center font-medium text-sm">
              Registered Users: Login Credentials
            </div>
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="student"
                      checked={formData.userType === 'student'}
                      onChange={(e) => handleInputChange('userType', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Student</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="applicant"
                      checked={formData.userType === 'applicant'}
                      onChange={(e) => handleInputChange('userType', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Personnel</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="applicant"
                      checked={formData.userType === 'applicant'}
                      onChange={(e) => handleInputChange('userType', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Other</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="applicant"
                      checked={formData.userType === 'applicant'}
                      onChange={(e) => handleInputChange('userType', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Alumni</span>
                  </label>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Number:
                  </label>
                  <input
                    type="text"
                    value={formData.studentNumber}
                    onChange={(e) => handleInputChange('studentNumber', e.target.value)}
                    className={`w-full px-3 py-2 border rounded ${
                      errors.studentNumber ? 'border-red-500' : 
                      validationStatus.studentNumber ? 'border-green-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    placeholder="Enter student number"
                    maxLength={8}
                  />
                  {/* Real-time feedback */}
                  {errors.studentNumber && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.studentNumber}
                    </div>
                  )}
                  {validationStatus.studentNumber && (
                    <div className="text-green-600 text-xs mt-1">✓ Valid student number</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PIN:
                  </label>
                  <div className="relative">
                    <input
                      type={showPin ? 'text' : 'password'}
                      value={formData.pin}
                      onChange={(e) => handleInputChange('pin', e.target.value)}
                      className={`w-full px-3 py-2 pr-10 border rounded ${
                        errors.pin ? 'border-red-500' : 
                        validationStatus.pin ? 'border-green-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      placeholder="Enter PIN"
                    />
                    {/* Show/Hide Password Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Real-time feedback */}
                  {errors.pin && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.pin}
                    </div>
                  )}
                  {validationStatus.pin && (
                    <div className="text-green-600 text-xs mt-1">✓ Valid PIN</div>
                  )}
                </div>

                <p className="text-xs text-gray-600">
                  (5 numeric digits Do not start with a 0.)
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {/* Primary Action - Login Button with enhanced affordance */}
                  <button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className={`px-4 py-2 text-sm font-medium rounded transition-all duration-200 ${
                      isFormValid && !isLoading
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Logging in...
                      </div>
                    ) : (
                      'Login'
                    )}
                  </button>

                  {/* Secondary Actions with consistent styling */}
                  <button
                    type="button"
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors duration-200"
                  >
                    Forgot Pin
                  </button>
                  <button
                    type="button"
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors duration-200"
                  >
                    Change Pin
                  </button>
                  <button
                    type="button"
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors duration-200"
                  >
                    Request A Pin
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Forgot Student Number
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 sm:mt-8 text-xs text-gray-600 px-4">
          <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
            <a href="#" className="hover:text-blue-600">Contact Us</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-blue-600">About Us</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-blue-600">Admissions</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-blue-600">Terms & Conditions</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-blue-600">Privacy & Security Statement</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-blue-600">Powered by</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage