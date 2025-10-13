import { useTranslation } from 'react-i18next';
import {
  FaApple,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';

export default function DownloadApp() {
  const { t } = useTranslation('footer');
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-4 md:mb-6">
        {t('sections.downloadApp.title')}
      </h4>
      <div className="space-y-3">
        <a href="#" className="block">
          <div className="flex items-center bg-black text-white rounded-lg p-2 md:p-3 hover:bg-gray-800 transition-colors min-w-0">
            <FaGooglePlay className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs truncate">
                {t('sections.downloadApp.getItOn')}
              </p>
              <p className="font-semibold text-sm md:text-base truncate">
                {t('sections.downloadApp.googlePlay')}
              </p>
            </div>
          </div>
        </a>

        <a href="#" className="block">
          <div className="flex items-center bg-black text-white rounded-lg p-2 md:p-3 hover:bg-gray-800 transition-colors min-w-0">
            <FaApple className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs truncate">
                {t('sections.downloadApp.downloadOn')}
              </p>
              <p className="font-semibold text-sm md:text-base truncate">
                {t('sections.downloadApp.appStore')}
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="mt-6 md:mt-8">
        <h5 className="font-semibold text-gray-800 mb-3 md:mb-4">
          {t('sections.downloadApp.followUs')}
        </h5>
        <div className="flex flex-wrap gap-3">
          <a
            href="#"
            className="w-8 h-8 md:w-9 md:h-9 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <FaFacebookF className="w-3 h-3 md:w-4 md:h-4" />
          </a>
          <a
            href="#"
            className="w-8 h-8 md:w-9 md:h-9 bg-blue-400 text-white rounded flex items-center justify-center hover:bg-blue-500 transition-colors"
          >
            <FaTwitter className="w-3 h-3 md:w-4 md:h-4" />
          </a>
          <a
            href="#"
            className="w-8 h-8 md:w-9 md:h-9 bg-pink-600 text-white rounded flex items-center justify-center hover:bg-pink-700 transition-colors"
          >
            <FaInstagram className="w-3 h-3 md:w-4 md:h-4" />
          </a>
          <a
            href="#"
            className="w-8 h-8 md:w-9 md:h-9 bg-blue-700 text-white rounded flex items-center justify-center hover:bg-blue-800 transition-colors"
          >
            <FaLinkedinIn className="w-3 h-3 md:w-4 md:h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
