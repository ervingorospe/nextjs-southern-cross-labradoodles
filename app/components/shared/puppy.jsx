import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import Link from 'next/link'
// motion
import { fadeInFromBottom, fadeInFromLeft, fadeInFromRight } from '@/function/framer-animation'
// layouts
import { Motion, MotionVariant } from '@/app/layouts'
// components
import { ImageHolder } from '@/components/shared'
// functions
import { formatRouteName } from '@/function/formatting'


export async function Puppy({ subCollection, withButton = true }) {
  if (subCollection.length) {
    return (
      <div className="space-y-16">
        {
          subCollection?.map(item => {
            const slugName = `/puppies/available-puppies/${formatRouteName(item.name)}`

            return (
              <Motion className="grid items-center gap-10 lg:grid-cols-12 xl:gap-x-16" key={item.id}>
                {
                  _.get(item, 'fields.image') && (
                    <MotionVariant 
                      className="lg:col-span-5"
                      variants={fadeInFromLeft}
                    >
                      <ImageHolder
                        image={_.get(item, 'fields.image')} 
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
                    <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">{item.name}</h2>
                  </MotionVariant>

                  {
                    (_.get(item, 'fields.born') || _.get(item, 'fields.subtitle')) && (
                      <MotionVariant variants={fadeInFromRight}>
                        <p className="text-secondary-700 italic mt-1 text-xl md:text-2xl">{ _.get(item, 'fields.born') ? `Born on ${moment(_.get(item, 'fields.born')).format('ll')}` : _.get(item, 'fields.subtitle')}</p>
                      </MotionVariant>
                    )
                  }
                  {
                    item.fields.body && (
                      <MotionVariant className="prose mt-6 xl:prose-lg" variants={fadeInFromBottom}  dangerouslySetInnerHTML={{__html: item.fields.body}}/>
                    )
                  }

                  {/* section buttons */}
                  {
                    withButton && (
                      <MotionVariant 
                        className="mt-6"
                        variants={fadeInFromBottom}
                      >
                        <Link href={slugName} className="button inline-flex bg-primary-600 text-white hover:bg-primary-700 hover:text-white focus:ring-primary-700 sm:w-auto">
                          View Litter
                        </Link>
                      </MotionVariant>
                    )
                  }
                </div>
              </Motion>
            )
          })
        }
      </div>
    )
  }
}
