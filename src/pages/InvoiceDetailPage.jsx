import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { Card, Descriptions } from "antd";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const invoice = useSelector((state) =>
    state.invoice.items.find((inv) => inv.id === id)
  );
  if (!invoice) {
    //If no invoice found(maybe reload), redirect back
    return <Navigate to="/invoices" replace />;
  }

  return (
    <Card
      title={`Invoice Detail: ${invoice.invoiceNumber}`}
      style={{ margin: 24 }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Date">{invoice.issueDate}</Descriptions.Item>
        <Descriptions.Item label="Amount">
          {invoice.totalAmount} ₺
        </Descriptions.Item>
        <Descriptions.Item label="Status">{invoice.status}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {invoice.description || "-"}
        </Descriptions.Item>
        {/* add more fields as needed */}
      </Descriptions>
    </Card>
  );
}
