/* eslint-disable @next/next/no-img-element */
'use client'

import { Fragment} from 'react'
import Link from 'next/link'
// tailwind
import { Popover, Transition } from '@headlessui/react'
// function
import { getButtonDetails } from '@/function/navigation'

const NavLinks = ({ className, navigation, close, mobile }) => {
  const filteredNav = _.filter(navigation, data => _.get(data, 'fields.showInNavigation'))
  const parentLink = _.filter(filteredNav, data => data.parentId === 0)

  return (
    <nav className={className.navContainer}>
      {
        parentLink?.map(item => {
          const subNav = _.filter(filteredNav, data => data.parentId === item.id);
          
          if (subNav.length === 0) {
            return (
              <ButtonLink
                close={close}
                className={className.buttonLink}
                navigation={navigation}
                data={{
                  button: {
                    url: _.get(item, 'fields.nav.url') ? _.get(item, 'fields.nav.url') : item.slug,
                    text: item.name,
                    target: _.get(item, 'fields.nav.target'),
                  },
                  buttonPageLink: _.get(item, 'fields.pageLink'),
                }}
                key={item.name}
              />
            )
          }

          return (
            <SubNav
              closeMenu={close}
              navigation={navigation}
              item={item}
              subNav={_.filter(subNav, data => data.fields.showInNavigation)}
              className={className}
              key={item.name}
              mobile={mobile}
            />
          )
        })
      }
    </nav>
  )
}

const SubNav = ({ navigation, className, item, subNav, mobile, closeMenu }) => (
  <Popover
      className="group relative"
    >
    {({ open }) => (
      <>
        <Popover.Button styles={{ border: 'none !important;' }} className="cursor-pointer">
          <div className={className.buttonLink}>
            <span>{item.name}</span>
            <svg
              className={`${className.icon.link} transition-transform ${open ? `rotate-180 ${className.icon.hover}` : ''}`}
              x-description="Heroicon name: solid/chevron-down"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel
            className={className.subNav.popoverPanel}
            static
          >
            {({ close }) => (
              <div className={className.subNav.container}>
                <div className={className.subNav.subContainer}>
                  {
                    subNav?.map((subItem, i) => {
                      return (
                        <div key={subItem.id} onClick={ !mobile ? () => close() : () => closeMenu() }>
                          <CustomLink 
                            mobile={mobile}
                            data={{
                              icon: _.get(subItem, 'fields.svgIcon'),
                              button: {
                                url: _.get(subItem, 'fields.nav.url') ? _.get(subItem, 'fields.nav.url') : subItem.slug,
                                text: subItem.name,
                                target: _.get(subItem, 'fields.nav.target'),
                              },
                              buttonPageLink: _.get(subItem, 'fields.pageLink'),
                            }}
                            className={{
                              container: className.subNav.subLinkContainer,
                              text: className.subNav.subLink
                            }}
                            navigation={navigation}
                          />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
)

const NavButtons = ({ actionButtons, navigation, close, mobile = false }) => {
  const styles = {
    mobile: 'block text-center px-5 py-3 w-full border-primary-button bg-primary-button text-primary-button hover:bg-primary-button-hover hover:text-primary-button-hover',
    0: "button button inline-flex border-secondary-button bg-secondary-button text-secondary-button hover:bg-secondary-button-hover hover:text-secondary-button-hover",
    1: "button button inline-flex border-primary-button bg-primary-button text-primary-button hover:bg-primary-button-hover hover:text-primary-button-hover",
  }

  return (
    actionButtons?.map((item, i) => {
      if (_.get(item, 'fields.type') === 'Telephone') {
        const formatPhone = _.get(item, 'fields.button.text').replace(/[^A-Z0-9]/gi, '')

        return (
          <Link href={`tel:${formatPhone}`} className="group flex items-center space-x-1 text-lg text-link" key={item.name}>
            <span className="sr-only">Telephone</span>
            <span className="stroke-current text-link group-hover:text-link-hover">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </span>
            <p className="group-hover:text-link-hover">{_.get(item, 'fields.button.text')}</p>
          </Link>
        )
      }

      return (
        <ButtonLink
          className={!mobile ? styles[i] : styles.mobile}
          navigation={navigation}
          close={close}
          data={{
            button: {
              ..._.get(item, 'fields.button'),
              text: _.get(item, 'fields.button') ? _.get(item, 'fields.button.text') : _.get(item, 'name'),
            },
            buttonPageLink: _.get(item, 'fields.buttonPageLink'),
          }}
          key={item.name}
        />
      )
    })
  )
}

const ButtonLink = ({ data, className, navigation, close }) => {
  const buttonDetails = getButtonDetails({ data, navigation })
  
  return (
    <span onClick={() => close()}>
      <Link href={buttonDetails.url} className={className} target={buttonDetails.target}>
        {buttonDetails.text}
      </Link>
    </span>
  )
}

// custom
const CustomLink = ({ data, navigation, className, mobile }) => {
  const buttonDetails = getButtonDetails({ data, navigation })

  return (
    <Link href={buttonDetails.url} className={className.container} target={buttonDetails.target}>
      {
        !mobile ? (
          <div className="ml-3 flex items-center gap-3 transition-all">
            <p className={className.text}>
              {buttonDetails.text}
            </p>
            <svg
              className="fill-gray-400 transition-transform group-hover/child-nav:translate-x-2 group-hover/child-nav:fill-primary-700"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="long-arrow-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
              height="12"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path>
            </svg>
          </div>
        ) :
        (
          <div className={className.text}>
            {buttonDetails.text}
          </div>
        )
      }
    </Link>
  )
}

export {
  NavLinks,
  NavButtons,
  ButtonLink
}