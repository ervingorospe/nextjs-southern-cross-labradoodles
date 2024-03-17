import _ from 'lodash'
// function
import { pageDetails } from '@/function/page'
import { getNavigation, checkRoute } from '@/function/navigation'
import { sectionsComponent, formatComponentName } from '@/function/formatting'
// component
import * as ComponentSection from '@/components/sections'
import { DefaultHero } from '@/components/sections'
// api
import { generalInfo } from '@/api/collection'
// contants
import { navigationType } from '@/lib/constants'

export async function generateMetadata({ params }) {
  const general = await generalInfo()
  // for southern cross only
  const tempPath = params.slug.join("/")
  const path = await checkRoute(`${tempPath.replace("%40", "@")}`)
  
  // // this is the original
  // // const path = await checkRoute(`${params.slug.join("/")}`)

  if (path) {
    const { fields } = path
    const metaTitle = _.get(fields, 'metaTitle') ? _.get(fields, 'metaTitle') : _.get(general, 'defaultMetaTitle')
    const description = _.get(fields, 'metaDescription') ? _.get(fields, 'metaDescription') : _.get(fields, 'metaTitle')

    return {
      title: `${path.name} - ${metaTitle}`,
      description: `${path.name} - ${description}`,
      openGraph: {
        title: `${path.name} - ${metaTitle}`,
        description: `${path.name} - ${description}`,
        images: [`${_.get(fields, 'ogImage.imageUrl')}`],
        url: `${_.get(general, 'url')}${path.slug}`,
        site_name: _.get(general, 'organizationName')
      },
      alternates: {
        canonical: `${_.get(general, 'url')}${path.slug}`,
      },
    };
  }
}

export default async function Page({ params }) {
  // for southern cross only
  const tempPath = params.slug.join("/")
  const path = await checkRoute(`${tempPath.replace("%40", "@")}`)
  
  // // this is the original
  // // const path = await checkRoute(`${params.slug.join("/")}`)

  if (path) {
    const pageData = await pageDetails(path.id)

    return (
      _.size(pageData.activeSections) > 0 ? (
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
      ) :
      (
        <DefaultHero data={path}/>
      )
    )
  }
}

export async function generateStaticParams() {
  return await getNavigation(navigationType.ROUTES)
}
