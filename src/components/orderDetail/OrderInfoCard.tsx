interface OrderInfoCardProps {
  title: string;
  children: React.ReactNode;
}

const OrderInfoCard: React.FC<OrderInfoCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
};

export default OrderInfoCard;
