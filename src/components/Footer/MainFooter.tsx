import DownloadApp from './DownloadApp';
import ContactInfo from './ContactInfo';
import HelpLinks from './HelpLinks';
import ToKnowLinks from './ToKnowLinks';
import IncomeOpportunities from './IncomeOpportunities';

export default function MainFooter() {
  return (
    <div className="py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
        {/* Contact Info */}
        <ContactInfo />

        {/* Make Money with Us */}
        <IncomeOpportunities />

        {/* Let Us Help You */}
        <HelpLinks />

        {/* Get to Know Us */}
        <ToKnowLinks />

        {/* Download App */}
        <DownloadApp />
      </div>
    </div>
  );
}
