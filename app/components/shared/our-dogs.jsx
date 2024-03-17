'use client'

import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromLeft, fadeInFromRight, fadeInFromTop } from '@/function/framer-animation'
// layouts
import { Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, ImageHolder, DogAttributeTable } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/lib/constants'
// api
import { getCollection } from '@/api/collection'

const defaults = {
  ...defaultSectionStyles,
  margin: {
    ...defaultSectionStyles.margin,
    subtitle: 'mt-4'
  }
}

export async function OurDogs({ data, sectionCount, subCollection }) {
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
    <Container className="relative" margin="section" width="max-w-screen-xl">
      <Motion className="grid items-start gap-10 lg:grid-cols-12 xl:gap-x-16">
        {
          _.get(fields, 'image') && (
            <MotionVariant 
              className="lg:col-span-5"
              variants={fadeInFromLeft}
            >
              <ImageHolder
                image={_.get(fields, 'image')} 
                className={{
                  figure: "",
                  image: "lg:mx-auto rounded-xl shadow-lg"
                }}
              />
            </MotionVariant>
          )
        }

        <div className="lg:col-span-7">
          <MotionVariant variants={fadeInFromRight}>
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
          
          {
            (_.get(fields, 'sire') || _.get(fields, 'dam') || _.get(fields, 'height') || _.get(fields, 'weight') || _.get(fields, 'color')) && (
              <DogAttributeTable fields={fields}/>
            )
          }

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
        </div>
      </Motion>

      {
        (subCollection &&subCollection.length > 0) && (
          <Motion className="mt-8 grid gap-6 grid-cols-4 md:mt-10">
            {
              subCollection?.map((item, i) => (
                <MotionVariant
                  variants={fadeInFromBottom}
                  key={i}
                >
                  <ImageHolder
                    image={{
                      imageUrl: _.get(item, 'file.imageUrl'),
                      altText: 'Southern Cross Labradoodles',
                      caption: ''
                    }} 
                    className={{
                      figure: "aspect-w-1 aspect-h-1",
                      image: "object-cover obejct-center absolute left-0 top-0 w-full h-full rounded-lg shadow-lg"
                    }}
                  />
                </MotionVariant>
              ))
            }
          </Motion>
        )
      }
    </Container>
  )
}
