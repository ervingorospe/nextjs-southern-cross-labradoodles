import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons, SectionImageVideo } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/lib/constants'

const defaults = {
  ...defaultSectionStyles,
  title: {
    size: 'default',
    style: 'default-inverted'
  }
}

export async function AboutUs({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : sectionCount === 1 ? 'h1' : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : sectionCount === 1 ? 'h2' : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 
  const extraBodySize = _.get(fields, 'extraBodySize') === 'default' ? defaults.extraBodySize : _.get(fields, 'extraBodySize') 

  let title = defaults.title
  let subtitle = defaults.subtitle

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  return (
    <Section className="relative py-16" bg={bg}>
      <div className="pattern-light absolute inset-0 bg-fixed"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white"></div>
      <div className="absolute inset-0 overflow-hidden leading-[0px] text-white">
        <svg className="absolute left-0 bottom-0 w-full transform fill-current text-primary-600" viewBox="0 0 1000 200">
          <path d="M 0 80 Q 500 -50 1000 80 L 1000 200 L 0 200 Z" />
        </svg>
        <svg className="absolute left-0 bottom-0 w-full transform fill-current text-white" viewBox="0 0 1000 200">
          <path d="M 0 85 Q 500 -10 1000 85 L 1000 200 L 0 200 Z" />
        </svg>
      </div>

      <Container width={width} margin="" className="relative z-1">
        <div className="bg-secondary-500 relative overflow-hidden rounded-xl py-24 lg:py-36 px-8 shadow-2xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-16">
          <div className="absolute inset-0 opacity-50 mix-blend-multiply saturate-0 filter">
            {
              _.get(fields, 'backgroundImage.imageUrl') && (
                <div className="absolute absolute inset-0 aspect-w-1">
                  <Image
                    src={_.get(fields, 'backgroundImage.imageUrl')}
                    alt={_.get(fields, 'backgroundImage.altText')}
                    height={1000}
                    width={1000}
                    priority={true}
                    className="object-cover"
                  />
                </div>
              )
            }
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-800 opacity-50"></div>

          <Motion className="relative lg:col-span-1">
            <blockquote>
              {/* title */}
              <MotionVariant variants={fadeInFromLeft}>
                <Title
                  title={_.get(fields, 'title')}
                  tag={titleTag}
                  align={titleAlign}
                  style={title.style}
                  size={title.size}
                  className={`${defaults.margin.title} ${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
                />
              </MotionVariant>

              {/* subtitle */}
              <MotionVariant variants={fadeInFromLeft}>
                <Title
                  title={_.get(fields, 'subtitle')}
                  tag={subtitleTag}
                  align={titleAlign}
                  style={subtitle.style}
                  size={subtitle.size}
                  className={`${defaults.margin.subtitle} ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
                />
              </MotionVariant>

              {/* body */}
              <MotionVariant variants={fadeInFromBottom}>
                <Body
                  body={_.get(fields, 'body')}
                  size={bodySize}
                  className={`${defaults.margin.body} ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
                />
              </MotionVariant>

              {/* extra body */}
              <MotionVariant variants={fadeInFromBottom}>
                <Body
                  body={_.get(fields, 'extraBody')}
                  size={extraBodySize}
                  className={`${defaults.margin.extraBody} ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
                />
              </MotionVariant>

              <SectionButtons
                fields={fields}
                defaults={defaults}
              />
            </blockquote>
          </Motion>
        </div>
      </Container>
    </Section>
  )
}
