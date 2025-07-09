import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../features/invoice/invoiceThunks";
import { Table, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function InvoiceListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, status, error } = useSelector((state) => state.invoice);

  useEffect(() => {
    const filter = {
      companyId: "01c880ca-46b5-4699-a477-616b84770071",
      documentType: "OUTGOING",
      startDate: "2025-06-27T00:00:00.000Z",
      endDate: "2025-07-04T08:31:10.422Z",
      page: 0,
      size: 20,
      referenceDocument: "",
      type: null,
      status: null,
      paymentStatus: null,
      isDeleted: false,
    };
    dispatch(fetchInvoices({ filter }))
      .unwarp()
      .catch((msg) => message.error(msg));
  }, [dispatch]);

  const columns = [
    {
      title: "Invoice No",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Date",
      dataIndex: "issueDate",
      key: "issueDate",
      render: (date) => dayjs(date).format(DD / MM / YYYY),
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (val) => `${val} ₺`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Detail",
      key: "detail",
      render: (_, record) => (
        <Button onClick={() => navigate(`/invoices/${record.id}`)}>
          Detail
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Invoice List</h2>
      <Table
        rowKey="id"
        loading={status === "loading"}
        columns={columns}
        dataSource={items}
        pagination={{
          total,
          pageSize: 20,
          showSizeChanger: false,
        }}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
