import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
// motion
import { fadeInFromBottom, fadeInFromTop } from '@/function/framer-animation'
// layouts
import { Section, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons, SectionImageVideo } from '@/components/shared'
// constants
import { defaultImageAlt, defaultSectionStyles } from '@/lib/constants'
// api
import { getCollection } from '@/api/collection'

const defaults = {
  ...defaultSectionStyles,
  title: {
    size: 'text-2xl',
    style: 'default'
  },
  subtitle: {
    size: 'text-lg',
    style: 'default-subtitle'
  },
  margin: {
    ...defaultSectionStyles.margin,
    body: 'mt-3'
  }
}

export async function Checklist({ data, sectionCount }) {
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

  let subCollection = [];

  if (_.get(fields, 'contentCollection')) {
    const collections = await getCollection(_.get(fields, 'contentCollection'))
    subCollection = _.filter(collections[0].items, data => data.fields.active)
  }

  return (
    <div id="variety" className="on-scroll-variety">
      <Section className="relative" bg={bg}>
        <div className={`relative z-1 ${width} mt-8`}>
          <Motion>
            <SectionImageVideo
              fields={fields}
              defaults={defaults}
            />

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
                size=""
                className={`${defaults.margin.body} ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')} mt-3 text-lg text-gray-600 md:text-x`}
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

            {
              subCollection.length && (
                <div className="mt-5 grid gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {
                    subCollection?.map((item, i) => (
                      <MotionVariant variants={fadeInFromBottom} key={i} className="flex">
                        <span className="mr-3 inline-flex">
                          <Image
                            src={_.get(item, 'fields.image.imageUrl')}
                            alt={defaultImageAlt}
                            height={1000}
                            width={1000}
                            className="w-5"
                          />
                        </span>
                        <p className="font-heading text-lg font-semibold uppercase tracking-wide text-secondary-900">{item.name}</p>
                      </MotionVariant>
                    ))
                  }
                </div>
              )
            }
          </Motion>
        </div>
      </Section>
    </div>
  )
}
