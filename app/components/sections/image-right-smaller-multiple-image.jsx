import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromTop, fadeInFromRight } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons, ImageHolder } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/lib/constants'

const defaults = {
  ...defaultSectionStyles,
  margin: {
    ...defaultSectionStyles.margin,
    body: 'mt-0 md:mt-4'
  }
}

export async function ImageRightSmallerMultipleImage({ data, sectionCount }) {
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
  // remove this <div> container for souther cross only
    <div id="registry" className="on-scroll-history"> 
      <Section className="relative" bg={bg}>
        <Container width={width} margin="section" className="relative z-1">
          <Motion className="items-center grid gap-10 md:mt-8 lg:mt-6 lg:grid-cols-12 xl:gap-x-20">
            <div className="lg:col-span-4 space-y-4">
              <MotionVariant variants={fadeInFromRight}>
                <ImageHolder 
                  image={fields.image} 
                  className={{
                    figure: "",
                    image: "lg:mx-auto border"
                  }}
                />
              </MotionVariant>

              <MotionVariant variants={fadeInFromRight}>
                <ImageHolder 
                  image={_.get(fields, 'image-2')} 
                  className={{
                    figure: "",
                    image: "lg:mx-auto border"
                  }}
                />
              </MotionVariant>
            </div>

            <div className="lg:row-start-1 lg:col-span-8">
              {/* title */}
              <MotionVariant variants={fadeInFromTop}>
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
              <MotionVariant variants={fadeInFromTop}>
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
            </div>
          </Motion>
        </Container>
      </Section>
    </div>
  )
}
