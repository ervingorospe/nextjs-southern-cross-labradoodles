import _ from 'lodash'
// function
import { pageDetails } from '@/function/page'
import { getNavigation, checkRoute } from '@/function/navigation'
import { sectionsComponent, formatComponentName } from '@/function/formatting'
// component
import * as ComponentSection from '@/components/sections'
// contants
import { fluxIds, navigationType } from '@/lib/constants'
// api
import { generalInfo } from '@/api/collection'

export async function generateMetadata({ params }) {
  const general = await generalInfo()
  const path = await checkRoute(`/`)
  const { fields } = path
  const metaTitle = _.get(fields, 'metaTitle') ? _.get(fields, 'metaTitle') : _.get(general, 'defaultMetaTitle')
  const description = _.get(fields, 'metaDescription') ? _.get(fields, 'metaDescription') :  _.get(general, 'defaultMetaTitle')

  return {
    title: metaTitle,
    description: description,
    openGraph: {
      title: metaTitle,
      description: description,
      images: [`${_.get(fields, 'ogImage.imageUrl')}`],
      url: _.get(general, 'url'),
      site_name: _.get(general, 'organizationName')
    },
    alternates: {
      canonical: _.get(general, 'url'),
    },
  };
}


export default async function Home() {
  const pageData = await pageDetails(fluxIds.HOMEPAGE)

  return (
    _.size(pageData.activeSections) > 0 && (
      pageData.activeSections?.map((item, i) => {
        const componentName = sectionsComponent(item)

        if (componentName) {
          const ComponentType = ComponentSection[formatComponentName(componentName)] ? ComponentSection[formatComponentName(componentName)] : null

          if (ComponentType) {
            return <ComponentType 
              data={item} 
              key={item.name}
              sectionCount={i+1} 
            />
          }
        }
      })
    )
  )
}

export async function generateStaticParams() {
  return await getNavigation(navigationType.ROUTES)
}