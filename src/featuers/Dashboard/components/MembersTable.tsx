import CustomTable from '@/components/Global/CustomTable';
import DotDropdown from '@/components/Global/DotDropdown';
import Heading from '@/components/Global/Heading';
import { Badge, Card } from 'antd';
import React from 'react'

function MembersTable() {
    const membersColumns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: any) => (
                <div className="flex items-center gap-3">
                    <img
                        src={record.avatar || "/placeholder.svg"}
                        alt={text}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: string) => {
                let color = "blue";
                if (role === "Admin") color = "red";
                if (role === "Moderator") color = "green";
                return <Badge color={color} text={role} />;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: any) => {
                const items = [
                    {
                        key: "1",
                        label: "View Profile",
                    },
                    {
                        key: "2",
                        label: "Make Moderator",
                        danger: true,
                    },
                    {
                        key: "3",
                        label: "Ban",
                    }
              
                ]
                return <DotDropdown items={items} />
            }
        }
    ]


  return (
    <Card className="mb-8 shadow-sm p-3">
      <div className="flex justify-between items-center mb-4">
        <Heading text="Community Members" />
      </div>
      <CustomTable
        columns={membersColumns}
        data={[]}
        className="mb-4"
      />
    </Card>
  );
}

export default MembersTable