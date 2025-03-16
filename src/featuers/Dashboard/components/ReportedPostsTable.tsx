import CustomTable from '@/components/Global/CustomTable';
import DotDropdown from '@/components/Global/DotDropdown';
import Heading from '@/components/Global/Heading';
import { Badge, Card } from 'antd';
import React from 'react'

function ReportedPostsTable() {
      const reportedPostsColumns = [
        {
          title: "Post ID",
          dataIndex: "postId",
          key: "postId",
        },
        {
          title: "Report Reason",
          dataIndex: "reason",
          key: "reason",
        },
        {
          title: "Reported By",
          dataIndex: "reportedBy",
          key: "reportedBy",
        },
        {
          title: "Report Count",
          dataIndex: "reportCount",
          key: "reportCount",
          render: (count: number) => (
            <Badge
              count={count}
              style={{ backgroundColor: count > 3 ? "#ff4d4f" : "#faad14" }}
            />
          ),
        },
        {
          title: "Actions",
          key: "actions",
            render: (_: any, record: any) => {
                const items = [
                    {
                        key: "1",
                        label: "View Post",
                    },
                    {
                        key: "2",
                        label: "Hide Post",
                        danger: true,
                    },
                    {
                        key: "3",
                        label: "Dismiss Report",
                    }
                ]
                return <DotDropdown items={items}/>
          }
        },
      ];
  return (
    <Card className="mb-8 shadow-sm p-2">
      <div className="flex justify-between items-center mb-4">
        <Heading text="Reported Posts" />
      </div>
      <CustomTable
        columns={reportedPostsColumns}
        data={[]}
        className="mb-4"
      />
    </Card>
  );
}

export default ReportedPostsTable