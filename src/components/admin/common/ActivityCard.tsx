interface ActivityCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  icon: Icon,
  title,
  value,
  color,
}) => {
  return (
    <div
      className={`p-4 rounded-lg flex items-center space-x-4`}
      style={{ backgroundColor: `${color}1A` }}
    >
      <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}3A` }}>
        <Icon size={24} style={{ color: color }} />
      </div>
      <div>
        <span className="text-sm text-gray-500">{title}</span>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
