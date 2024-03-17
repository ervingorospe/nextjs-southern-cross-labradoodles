import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromTop, fadeInFromLeft, fadeInFromRight } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, ImageHolder } from '@/components/shared'
// constants
import { defaultSectionStyles } from '@/lib/constants'
// api
import { getCollection } from '@/api/collection'

const defaults = {
  ...defaultSectionStyles,
  width: "max-w-screen-lg"
}

export async function HallOfFamePuppies({ data, sectionCount }) {
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
    <Section className="relative" bg={bg}>
      <Container width={width} margin="section" className="relative z-1">
        <Motion>
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
        </Motion>

        <Puppies subCollection={subCollection}/>
      </Container>
    </Section>
  )
}

const Puppies = ({ subCollection }) => {
  if (subCollection.length) {
    return (
      <div className="space-y-16">
        {
          subCollection?.map(item => (
            <Motion className="grid items-start gap-10 lg:grid-cols-3 xl:gap-x-16" key={item.id}>
              <MotionVariant variants={fadeInFromLeft}  className="lg:col-span-1">
                <ImageHolder
                  image={_.get(item, 'fields.image')} 
                  className={{
                    figure: "",
                    image: "lg:mx-auto rounded-xl shadow-lg"
                  }}
                />
              </MotionVariant>

              <div className="lg:col-span-2">
                <MotionVariant variants={fadeInFromRight}>
                  <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">{item.name}</h2>
                </MotionVariant>

                <MotionVariant variants={fadeInFromRight}>
                  <p className="mt-1 text-xl italic text-secondary-700 md:text-2xl">{_.get(item, 'fields.subtitle')}</p>
                </MotionVariant>

                <MotionVariant variants={fadeInFromRight} className="prose mt-6 xl:prose-lg" dangerouslySetInnerHTML={{__html: _.get(item, 'fields.body')}}/>
              </div>
            </Motion>
          ))
        }
      </div>
    )
  }
}
