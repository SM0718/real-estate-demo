import { SectionHeader } from '@/components/shared/SectionHeader'
import { MetricCounter } from '@/components/shared/MetricCounter'
import { Reveal } from '@/components/shared/Reveal'

const metrics: Array<{
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
}> = [
  { value: 2.4, prefix: '$', suffix: 'B+', decimals: 1, label: 'Assets Under Management' },
  { value: 18, suffix: 'M+', label: 'Square Feet Managed' },
  { value: 32, label: 'Markets' },
  { value: 24, suffix: '+', label: 'Years of Experience' },
]

export function Metrics() {
  return (
    <section className="relative bg-bone py-24 md:py-32" aria-label="Company metrics">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHeader
              index="01"
              eyebrow="Trust"
              title="A PLATFORM BUILT FOR LONG-TERM VALUE."
            />
            <Reveal delay={0.2} className="mt-8">
              <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                Figures shown are illustrative for demonstration purposes.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:gap-x-12">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={0.08 * i}>
                <MetricCounter
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals ?? 0}
                  label={m.label}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}