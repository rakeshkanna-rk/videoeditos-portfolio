import React from "react";
import { useSiteContent } from "../context/SiteContentContext";

export const Footer: React.FC = () => {
  const { getVal } = useSiteContent();

  const copyrightName = getVal('footer', 'copyright_name') || 'Thiruvasagam';
  const developerName = getVal('footer', 'developer_name') || 'Rakesh Kanna S';
  const developerUrl = getVal('footer', 'developer_url') || 'https://rakeshkanna-rk.github.io';

  return (
    <footer className="py-12 border-t border-slate-900 md:pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-tighter uppercase">
            THIRU<span className="text-sky-500">.</span>STUDIO
          </div>

          <div className="text-slate-500 text-sm font-light text-center md:text-right">
            <p>
              &copy; {new Date().getFullYear()} {copyrightName}. All rights
              reserved.
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Developed by{" "}
              <a
                className="text-sky-500"
                target="_blank"
                href={developerUrl}
              >
                {developerName}
              </a>{" "}
              with passion for storytelling.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
