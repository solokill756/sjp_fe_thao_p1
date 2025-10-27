const InfoCard: React.FC<{
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}> = ({ title, icon: Icon, children }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 border-b pb-2 mb-3">
        <Icon size={18} className="text-gray-600" />
        <h4 className="text-md font-semibold text-gray-800">{title}</h4>
      </div>
      <div className="text-sm text-gray-600 space-y-1">{children}</div>
    </div>
  );
};

export default InfoCard;
