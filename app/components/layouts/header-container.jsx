import React from 'react'
// contants
import { navigationType, fluxIds } from '@/lib/constants'
// components
import { Header } from '@/components/layouts'
// function
import { getNavigation } from '@/function/navigation'
// api
import { generalInfo, getCollectionItems } from '@/api/collection'

export async function HeaderContainer() {
  const navigation = await getNavigation(navigationType.INFO)
  const general = await generalInfo()
  const actionButtons = await getCollectionItems(fluxIds.ACTION_BUTTONS)

  return (
    <>
      <Header 
        navigation={navigation} 
        general={general}
        actionButtons={actionButtons}
      />
    </>
  )
}
