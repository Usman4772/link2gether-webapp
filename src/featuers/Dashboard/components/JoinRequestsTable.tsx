import CustomButton from "@/components/Global/CustomButton";
import CustomTable from "@/components/Global/CustomTable";
import Heading from "@/components/Global/Heading";
import { CheckOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Cross, X } from "lucide-react";
import React from "react";

function JoinRequestsTable() {
  const joinRequestsColumns = [
    {
      title: "User",
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
      title: "Requested At",
      dataIndex: "requestedAt",
      key: "requestedAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <CustomButton
            variant="secondary"
            icon={<CheckOutlined />}
            className="bg-green-500 hover:bg-green-600"
            text="Approve"
          />
          <CustomButton
            variant="danger"
            text="Reject"
            icon={<X />}
          />
        </div>
      ),
    },
    ];
    

    const data = [
    {
      key: "1",
      name: "Michael Brown",
      requestedAt: "April 2, 2023",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      key: "2",
      name: "Sarah Davis",
      requestedAt: "April 5, 2023",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    ]

  return (
    <Card className="shadow-sm p-2">
      <div className="flex justify-between items-center mb-4">
        <Heading text="Pending Join Requests" />
      </div>
      <CustomTable columns={joinRequestsColumns} data={data} className="mb-4" />
    </Card>
  );
}

export default JoinRequestsTable;
