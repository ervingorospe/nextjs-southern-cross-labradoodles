import _ from 'lodash'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// function
import { getPuppies, checkPuppy } from '@/function/navigation'
// component
import { HeroPuppy } from '@/components/sections'
import { ImageHolder } from '@/app/components/shared'
// api
import { generalInfo, getCollection } from '@/api/collection'
import { Motion, MotionVariant } from '@/app/layouts'

// contants
const navigationType = {
  ROUTES: 'STATIC ROUTES',
  INFO: 'NAVIGATION INFO'
}

export async function generateMetadata({ params }) {
  const general = await generalInfo()
  const path = await checkPuppy(`/${params.slug}`)

  if (path) {
    const { fields } = path
    const metaTitle = _.get(fields, 'metaTitle') ? _.get(fields, 'metaTitle') : _.get(general, 'defaultMetaTitle')
    const description = _.get(path, 'metaData.metaDescription') ? _.get(path, 'metaData.metaDescription') : _.get(fields, 'metaTitle')

    return {
      title: `${path.name} - ${metaTitle}`,
      description: `${path.name} - ${description}`,
      openGraph: {
        title: `${path.name} - ${metaTitle}`,
        description: `${path.name} - $description}`,
        images: [`${_.get(path, 'metaData.ogImage.imageUrl')}`],
        url: `${_.get(general, 'url')}puppies/available-puppies${path.slug}`,
        site_name: _.get(general, 'organizationName')
      },
      alternates: {
        canonical: `${_.get(general, 'url')}puppies/available-puppies${path.slug}`,
      },
    };
  }
}

export default async function Page({ params }) {
  const path = await checkPuppy(`/${params.slug}`)

  let subCollection = [];

  if (_.get(path, 'fields.puppies')) {
    const collections = await getCollection(_.get(path, 'fields.puppies'))
    subCollection = _.filter(collections[0].items, data => data.fields.active)
  }

  return (
    <>
      <HeroPuppy data={path}/>

      {
        subCollection.length > 0 && (
          <section className="relative">
            <div className="container relative z-1 max-w-screen-xl py-12 lg:py-16 xl:py-20 ">
              <Motion className="grid gap-6 grid-cols-2 md:grid-cols-3">
                {
                  subCollection?.map(item => (
                    <MotionVariant variants={fadeInFromBottom} key={item.id}>
                      <div className="w-full p-1 md:p-2">
                        <div className="overflow-hidden border-2 rounded-2xl">
                          <ImageHolder
                            image={_.get(item, 'fields.image')} 
                            className={{
                              figure: "",
                              image: "block object-center w-full h-full"
                            }}
                          />
                          <div className="lg:flex lg:space-x-2 p-4">
                            <p className="text-md lg:text-xl text-gray-900 font-bold">{item.name}</p>
                            {
                              _.get(item, 'fields.status') && (
                                <div className="flex flex-wrap justify-start">
                                  {
                                    _.get(item, 'fields.status') === 'Available' && (
                                      <div className="flex justify-center items-center font-medium py-2 px-4 bg-secondary-700 rounded-full text-gray-200">
                                        <div className="text-xs tracking-wide leading-none max-w-full flex-initial">{_.get(item, 'fields.status')}</div>
                                      </div>
                                    )
                                  }
                                  {
                                    _.get(item, 'fields.status') === 'Available Soon' && (
                                      <div className="flex justify-center items-center font-medium py-2 px-4 rounded-full text-secondary-700 border border-secondary-700">
                                        <div className="text-xs tracking-wide leading-none max-w-full flex-initial">{_.get(item, 'fields.status')}</div>
                                      </div>
                                    )
                                  }
                                  {
                                    _.get(item, 'fields.status') === 'Reserved' && (
                                      <div className="flex justify-center items-center font-medium py-2 px-4 rounded-full bg-primary-700 rounded-full text-gray-200">
                                        <div className="text-xs tracking-wide leading-none max-w-full flex-initial">{_.get(item, 'fields.status')}</div>
                                      </div>
                                    )
                                  }
                                </div>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </MotionVariant>
                  ))
                }
              </Motion>
            </div>
          </section>
        )
      }
    </>
  )
}

export async function generateStaticParams() {
  return await getPuppies(navigationType.ROUTES)
}
