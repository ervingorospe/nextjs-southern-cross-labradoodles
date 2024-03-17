/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
import moment from 'moment'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant, HeroLayout } from '@/app/layouts'
// components
import { Body, SectionImageVideo } from '@/components/shared'
// constants
import { defaultHeroStyles } from '@/lib/constants'

const defaults = {
  ...defaultHeroStyles,
  image: {
    figure: 'overflow-hidden',
    image: 'h-full w-full object-center',
    rounded: 'rounded-2xl',
    shadow: '',
    container: "lg:row-start-1"
  },
}

export async function HeroPuppy({ data }) {
  const { fields } = data

  return (
    <Section className="relative overflow-hidden" bg={defaults.bgColor}>
      <HeroLayout>

        <Container className="relative z-1" width={defaults.width} margin="hero">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Motion>
              {/* title */}
              <MotionVariant variants={fadeInFromLeft}>
                <h1 className="font-heading font-bold text-white text-4xl md:text-4xl lg:text-5xl">{data.name}</h1>
              </MotionVariant>
              
              {/* subtitle */}
              {
                fields.born && (
                  <MotionVariant variants={fadeInFromLeft}>
                    <h2 className="font-semibold uppercase text-primary-500 text-lg md:text-xl xl:text-2xl mt-1">Born on {moment(fields.born).format('ll')}</h2>
                  </MotionVariant>
                )
              }
              

              {/* body */}
              <MotionVariant variants={fadeInFromBottom}>
                <Body
                  body={_.get(fields, 'body')}
                  size=""
                  className="prose-primary-invert mt-6 md:prose-xl prose prose-lg"
                />
              </MotionVariant>
            </Motion>

            <SectionImageVideo
              fields={fields}
              defaults={defaults}
            />
          </div>
        </Container>
      
      </HeroLayout>
    </Section>
  )
}
