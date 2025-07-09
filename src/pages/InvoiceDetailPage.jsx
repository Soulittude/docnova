import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { Card, Descriptions } from "antd";
import { useTranslation } from "react-i18next";

export default function InvoiceDetailPage() {
  const { t } = useTranslation();
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
        <Descriptions.Item label={t("invoice.date")}>
          {invoice.issueDate}
        </Descriptions.Item>
        <Descriptions.Item label={t("invoice.amount")}>
          {invoice.totalAmount} ₺
        </Descriptions.Item>
        <Descriptions.Item label={t("invoice.status")}>
          {invoice.status}
        </Descriptions.Item>
        <Descriptions.Item label={t("invoice.description")}>
          {invoice.description || "-"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
