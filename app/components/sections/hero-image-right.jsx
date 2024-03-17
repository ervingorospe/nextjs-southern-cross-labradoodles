/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant, HeroLayout } from '@/app/layouts'
// components
import { Title, Body, Button, SectionImageVideo } from '@/components/shared'
// constants
import { defaultHeroStyles } from '@/lib/constants'

const defaults = {
  ...defaultHeroStyles
}

export async function HeroImageRight({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : sectionCount === 1 ? 'h1' : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : sectionCount === 1 ? 'h2' : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 
  const extraBodySize = _.get(fields, 'extraBodySize') === 'default' ? defaults.extraBodySize : _.get(fields, 'extraBodySize') 

  let title = {...defaults.title}
  let subtitle ={...defaults.subtitle}

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = {...defaults.subtitle}
    subtitle = {...defaults.title}
  }

  return (
    <Section className="relative overflow-hidden" bg={bg}>
      <HeroLayout>

        <Container className="relative z-1" width={width} margin="hero">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Motion>
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

              {/* custom buttons */}
              {
                (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
                  <div className="mt-8 grid space-y-2 sm:space-y-0 space-x-0 sm:flex sm:space-x-4">
                    {/* button 1*/}
                    {
                      _.get(fields, 'button') && (
                        <MotionVariant variants={fadeInFromBottom}>
                          <Button
                            data={{
                              button: {
                                ..._.get(fields, 'button')
                              },
                              buttonPageLink: _.get(fields, 'buttonPageLink')
                            }}
                            styles={defaults.buttonStyle2}
                          />
                        </MotionVariant>
                      )
                    }

                    {/* button 2*/}
                    {
                      _.get(fields, 'button-2') && (
                        <MotionVariant
                          variants={fadeInFromBottom}
                        >
                          <Button
                            data={{
                              button: {
                                ..._.get(fields, 'button-2')
                              },
                              buttonPageLink: _.get(fields, 'buttonPageLink')
                            }}
                            styles={defaults.buttonStyle2}
                          />
                        </MotionVariant>
                      )
                    }

                    {/* button 2*/}
                    {
                      _.get(fields, 'button-3') && (
                        <MotionVariant
                          variants={fadeInFromBottom}
                        >
                          <Button
                            data={{
                              button: {
                                ..._.get(fields, 'button-3')
                              },
                              buttonPageLink: _.get(fields, 'buttonPageLink')
                            }}
                            styles={defaults.buttonStyle2}
                          />
                        </MotionVariant>
                      )
                    }
                  </div>
                )
              }
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
