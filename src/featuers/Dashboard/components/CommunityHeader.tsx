import DotDropdown from '@/components/Global/DotDropdown'
import Heading from '@/components/Global/Heading'
import Paragraph from '@/components/Global/Paragraph'
import Status from '@/components/Global/Status'
import ChangeVisibilityModal from '@/featuers/Community/components/ChangeVisibilityModal'
import RulesModal from '@/featuers/Community/components/RulesModal'
import { getFormattedDate } from '@/utils/frontend/helpers/globals'
import React, { useState } from 'react'

interface CommunityHeaderProps {
  id: string;
  community_name: string;
  description: string;
  visibility:string;
  created_at: string;
}

function CommunityHeader({ data ,id}: { data: CommunityHeaderProps,id:string }) {
  const [openVisibilityModal, setOpenVisibilityModal] = useState(false);
  const [openRulesModal, setOpenRulesModal] = useState(false);
    const dropdownItems = [
    {
      key: "1",
        label: "Change Visibility",
        onClick: () => setOpenVisibilityModal(true),
    },
    {
      key: "2",
      label: "Add Rules",
      onClick: () => setOpenRulesModal(true),
        },

]


  return (
    <div className="mb-8 bg-green-50 h-[15%] p-4 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Heading text={data?.community_name} size="20px" />
            <Status text={data?.visibility} />
          </div>
          <Paragraph text={data?.description} />
        </div>
        <DotDropdown items={dropdownItems} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
        <div>
          <span className="font-medium">Created:</span>{" "}
          {getFormattedDate(data?.created_at)}
        </div>
        <div>
          <span className="font-medium">ID:</span> {data?.id}
        </div>
        <div>
          <span className="font-medium">Visibility:</span> {data?.visibility}
        </div>
      </div>

      <ChangeVisibilityModal
        openModal={openVisibilityModal}
        setOpenModal={setOpenVisibilityModal}
        data={data}
        id={id}
      />

      <RulesModal
        openModal={openRulesModal}
        setOpenModal={setOpenRulesModal}
        id={id}
      />
    </div>
  );
}

export default CommunityHeader