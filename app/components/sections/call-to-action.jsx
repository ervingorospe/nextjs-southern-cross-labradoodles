/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import _ from 'lodash'
// layouts
import { Section, Container } from '@/app/layouts'
import { Body } from '@/components/shared'
// functions
import { ButtonLink } from '@/function/header-functions'
// constants
import { defaultCallToActionStyles } from '@/lib/constants'

const defaults = {
  ...defaultCallToActionStyles,
}

export function CallToAction({ data = {}, navigation }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 

  let title = defaults.title
  let subtitle = defaults.subtitle

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  return (
    <Section className="relative" bg={bg}>
      <div className="pattern-light absolute inset-0 bg-fixed"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white"></div>
      <div className="absolute inset-0 overflow-hidden leading-[0px] text-white">
        <svg className="absolute left-0 bottom-0 w-full transform fill-current text-secondary-300" viewBox="0 0 1000 150">
          <path d="M 0 80 Q 500 -50 1000 80 L 1000 150 L 0 150 Z" />
        </svg>
        <svg className="absolute left-0 bottom-0 w-full transform fill-current text-secondary-900" viewBox="0 0 1000 150">
          <path d="M 0 80 Q 500 -20 1000 80 L 1000 150 L 0 150 Z" />
        </svg>
      </div>

      <Container width={width} margin="section" className="relative z-1">
        <div className="rounded-2xl bg-primary-600 bg-gradient-to-br from-primary-500 to-primary-800 p-6 shadow-lg md:p-8 lg:p-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">{_.get(fields, 'title')}</h2>
          {/* body */}
          <Body
            body={_.get(fields, 'body')}
            size={bodySize}
            className={`mt-6 ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')} prose prose-lg prose-primary-invert mx-auto md:prose-xl`}
          />

          {
            (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
              <div className="mt-8 space-y-2 md:space-y-0 md:space-x-2">
                {
                  _.get(fields, 'button') && (
                    <ButtonLink
                      className="button button-base inline-flex w-full border-2 border-white bg-transparent text-center text-white hover:border-white hover:bg-white hover:text-primary-700 md:w-auto"
                      navigation={navigation}
                      close={() => {}}
                      data={{
                        button: {
                          ..._.get(fields, 'button'),
                        },
                        buttonPageLink: _.get(fields, 'buttonPageLink')
                      }}
                    />
                  )
                }

                {
                  _.get(fields, 'button-2') && (
                    <ButtonLink
                      className="button button-base inline-flex w-full border-2 border-white bg-transparent text-center text-white hover:border-white hover:bg-white hover:text-primary-700 md:w-auto"
                      navigation={navigation}
                      close={() => {}}
                      data={{
                        button: {
                          ..._.get(fields, 'button-2'),
                        },
                        buttonPageLink: _.get(fields, 'buttonPageLink-2')
                      }}
                    />
                  )
                }
              </div>
            )
          }
        </div>
      </Container>
    </Section>
  )
}
