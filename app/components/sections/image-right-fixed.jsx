import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons, ImageHolder } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/lib/constants'

const defaults = {
  ...defaultSectionStyles
}

export async function ImageRightFixed({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
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
    <Section className="relative isolate overflow-hidden px-6 py-12 sm:py-16 lg:overflow-visible lg:px-0" bg={bg}>
      <div className="mx-auto grid grid-cols-1 max-w-2xl gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <Motion className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
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
            </div>
          </div>
        </Motion>

        <div className="-ml-12 -mt-16 lg:-mt-12 p-12 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          {
            fields.image && (
              <Motion>
                <MotionVariant variants={fadeInFromBottom} className="relative">
                  <ImageHolder
                    image={fields.image} 
                    className={{
                      figure: "",
                      image: "w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                    }}
                  />
                </MotionVariant>
              </Motion>
            )
          }
        </div>

        <div className="-mt-20 lg:-mt-6 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <Motion className="lg:pr-4">
            {/* extra body */}
            <MotionVariant variants={fadeInFromBottom}>
              <Body
                body={_.get(fields, 'extraBody')}
                size={extraBodySize}
                className={`${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')} prose max-w-xl text-base leading-relaxed`}
              />
            </MotionVariant>


            <SectionButtons
              fields={fields}
              defaults={defaults}
            />
          </Motion>
        </div>
      </div>
    </Section>
  )
}
