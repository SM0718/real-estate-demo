import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const interests = [
  'Leasing',
  'Investment',
  'Acquisition',
  'Asset Management',
  'Partnership',
  'General Inquiry',
]

interface FormState {
  name: string
  company: string
  email: string
  phone: string
  interest: string
  message: string
}

/**
 * Demo contact form — validates at the UI level and simulates a submission.
 * Swap the handleSubmit body for a real API call when a backend exists.
 */
export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Partial<FormState> = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name'
    if (!form.company.trim()) nextErrors.company = 'Please enter your company'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email'
    if (!form.interest) nextErrors.interest = 'Please select a topic'
    if (form.message.trim().length < 10) nextErrors.message = 'Tell us a little more (min 10 characters)'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex flex-col items-start gap-5 border border-ink/10 bg-white/50 p-8">
        <CheckCircle2 className="h-7 w-7 text-gold" strokeWidth={1.25} />
        <div>
          <p className="serif-display text-2xl text-ink">Thank you for reaching out.</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Your inquiry has been received. A member of our team will respond
            within one business day. This is a demo form — no message was sent.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setDone(false)}>
          Send another inquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <Input
            placeholder="Your full name"
            value={form.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
          />
        </Field>
        <Field label="Company" error={errors.company}>
          <Input
            placeholder="Company"
            value={form.company}
            onChange={update('company')}
            aria-invalid={Boolean(errors.company)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" error={errors.email}>
          <Input
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <Input
            type="tel"
            placeholder="+91 ..."
            value={form.phone}
            onChange={update('phone')}
          />
        </Field>
      </div>

      <Field label="I&apos;m interested in" error={errors.interest}>
        <Select value={form.interest} onValueChange={(v) => { setForm((f) => ({ ...f, interest: v })); if (errors.interest) setErrors((er) => ({ ...er, interest: undefined })) }}>
          <SelectTrigger>
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            {interests.map((interest) => (
              <SelectItem key={interest} value={interest}>
                {interest}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Message" error={errors.message}>
        <Textarea
          placeholder="Tell us about your requirements…"
          value={form.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
        />
      </Field>

      <div className="flex items-center justify-between gap-6 pt-2">
        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">
          Demo form — submissions are not transmitted.
        </p>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send Inquiry →'}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.62rem] font-medium uppercase tracking-[0.24em] text-muted">
        {label}
      </span>
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block text-xs text-[#a33]">
          {error}
        </span>
      )}
    </label>
  )
}