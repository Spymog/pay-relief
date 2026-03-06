'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { useSignup } from '@/hooks/use-signup'

export function CounselorsApplyForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    certification: '',
    specializations: '',
    experience: '',
    reason: '',
  })
  const { signup, isLoading, error } = useSignup()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await signup({
      email: formData.email,
      signup_type: 'counselor',
      full_name: formData.fullName,
      certification: formData.certification,
      specializations: formData.specializations,
      experience: formData.experience,
      reason_for_joining: formData.reason,
    })

    if (result.success) {
      setSubmitted(true)
      setFormData({
        fullName: '',
        email: '',
        certification: '',
        specializations: '',
        experience: '',
        reason: '',
      })
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section id="apply-form" className="w-full bg-secondary/30 py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Headline */}
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Apply in Under 3 Minutes
          </h2>
          <p className="text-lg text-foreground/60">
            Tell us about your practice and we'll review your application within 48 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {submitted ? (
            <div className="p-8 bg-primary/10 border border-primary/30 rounded-xl text-center">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                Application Submitted!
              </h3>
              <p className="text-foreground/60">
                We'll review your application and get back to you within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  placeholder="John Doe"
                  className="w-full disabled:opacity-50"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  placeholder="you@example.com"
                  className="w-full disabled:opacity-50"
                />
              </div>

              {/* Certification Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Certification Type *
                </label>
                <select
                  name="certification"
                  value={formData.certification}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a certification</option>
                  <option value="nfcc">NFCC</option>
                  <option value="afcpe">AFCPE</option>
                  <option value="naccc">NACCC</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Specializations */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Specializations (comma-separated)
                </label>
                <Input
                  type="text"
                  name="specializations"
                  value={formData.specializations}
                  onChange={handleChange}
                  placeholder="e.g., Credit Cards, Medical Debt, Student Loans"
                  className="w-full"
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Years of Experience *
                </label>
                <Input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  placeholder="5"
                  className="w-full"
                />
              </div>

              {/* Why Join */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Why do you want to join PayRelief? *
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  placeholder="Tell us what excites you about this opportunity..."
                  rows={4}
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Submit Button */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>

              {/* Fine Print */}
              <p className="text-xs text-foreground/50 text-center">
                Applications reviewed within 48 hours. NFCC, AFCPE, and NACCC credentials accepted.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
