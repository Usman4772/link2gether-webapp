import DotDropdown from '@/components/Global/DotDropdown'
import Heading from '@/components/Global/Heading'
import Paragraph from '@/components/Global/Paragraph'
import Status from '@/components/Global/Status'
import React from 'react'

function CommunityHeader({data}:any) {
    const dropdownItems = [
    {
      key: "1",
      label: "Change Visibility",
    },
    {
      key: "2",
      label: "Add Rules",
        },

]


  return (
      <div className="mb-8 bg-green-50 h-[15%] p-4 rounded-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Heading text={data?.name} size="20px" />
              <Status text="private"/>
            </div>
            <Paragraph text={data?.description} />
              </div>
              <DotDropdown items={dropdownItems}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
          <div>
            <span className="font-medium">Created:</span> {data?.createdAt}
          </div>
          <div>
            <span className="font-medium">ID:</span> {data?.id}
          </div>
          <div>
            <span className="font-medium">Visibility:</span>{" "}
            {data?.visibility}
          </div>
        </div>
      </div>  )
}

export default CommunityHeader