/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import Link from 'next/link'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, SectionButtons, ImageHolder } from '@/components/shared'
// function
import { facebookFeed } from '@/function/page'
// api
import { getItem } from '@/api/collection'
// constants
import { defaultSectionStyles, fluxIds, defaultImageAlt } from '@/lib/constants'

const defaults = {
  ...defaultSectionStyles,
  subtitle: {
    size: 'text-base',
    style: 'custom-subtitle'
  },
  textAlign: 'text-center',
  width: 'max-w-screen-xl',
  buttonContainer: `${defaultSectionStyles.buttonContainer} grid justify-center mx-auto`
}

export async function FacebookFeed({ data, sectionCount }) {
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

  const settings = _.first(await getItem(fluxIds.SETTINGS))
  const feedLimit = 3
  let feeds = []

  if (_.get(settings, 'fields.facebookFeedToken')) {
    const temp = await facebookFeed(settings.fields.facebookFeedId, feedLimit, settings.fields.facebookFeedToken)
    feeds = temp.data
  }

  return (
    <Section className="relative overflow-hidden" bg={bg}>
      <Container width={width} margin="section" className="relative">
        {/* title */}
        <Title
          title={_.get(fields, 'title')}
          tag={titleTag}
          align={titleAlign}
          style={title.style}
          size={title.size}
          className={`${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
        />

        {/* subtitle */}
        <Title
          title={_.get(fields, 'subtitle')}
          tag={subtitleTag}
          align={titleAlign}
          style={subtitle.style}
          size={subtitle.size}
          className={`mt-1 ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
        />

        {/* body */}
        <Body
          body={_.get(fields, 'body')}
          size={bodySize}
          className={`${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
        />

        {/* extra body */}
        <Body
          body={_.get(fields, 'extraBody')}
          size={extraBodySize}
          className={`mt-4 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
        />

        <Feeds feeds={feeds}/>

        <SectionButtons
          fields={fields}
          defaults={defaults}
        />
      </Container>
    </Section>
  )
}

const Feeds = ({ feeds }) => {
  return (
    feeds && (
      <Motion className="mt-6 grid gap-8 text-left md:mt-8 md:grid-cols-3">
        {
          feeds?.map((feed, i) => {
            const data = _.get(feed, 'attachments.data[0]')
            const slug = `${_.get(feed, 'permalink_url')}`

            return (
              <MotionVariant variants={fadeInFromBottom} className="cursor-pointer border-gray-20 relative overflow-hidden rounded-lg border-2 bg-white hover:border-secondary-400" key={i}>
                <Link
                  href={slug}
                  target="_blank"
                >
                  <ImageHolder
                    image={{
                      imageUrl: _.get(data, 'media.image.src') ? _.get(data, 'media.image.src') : 'https://fluxconsole.com/files/item/1323/180402/OG%20Image%20(3)%20(1).png',
                      altText: {defaultImageAlt}
                    }}
                    className={{
                      figure: "aspect-w-16 aspect-h-12 w-full",
                      image: "absolute left-0 top-0 w-full object-cover object-center"
                    }}
                  />

                  <div className="p-4 md:p-8">
                    <p className="text-lg font-semibold text-secondary-900">{moment(feed.created_time, "YYYYMMDD").fromNow()}</p>

                    <p className="mt-3 italic text-gray-600">{feed.message}</p>
                  </div>
                </Link>
              </MotionVariant>
            )
          })
        }
      </Motion>
    )
  )
}
