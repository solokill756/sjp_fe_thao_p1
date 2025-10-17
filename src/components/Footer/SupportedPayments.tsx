export default function SupportedPayments() {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2 pt-3">
      <img src="/visa.png" alt="Visa" className="h-5 md:h-6" />
      <img src="/mastercard.png" alt="Mastercard" className="h-5 md:h-6" />
      <img src="/payPal.png" alt="PayPal" className="h-5 md:h-6" />
      <img src="/skrill.png" alt="Skrill" className="h-5 md:h-6" />
      <img src="/klarna.png" alt="Klarna" className="h-5 md:h-6" />
    </div>
  );
}
