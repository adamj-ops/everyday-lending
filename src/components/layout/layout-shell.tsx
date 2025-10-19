'use client';

import { motion } from 'framer-motion';
import { AceternitySidebar } from './AceternitySidebar';
import { Topbar } from './topbar';

type LayoutShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  locale?: string;
};

export function LayoutShell({ children, title, subtitle, locale }: LayoutShellProps) {
  return (
    <AceternitySidebar>
      <div className="flex flex-1 flex-col overflow-hidden bg-muted/30">
        {/* Topbar */}
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => {}}
          showMenuButton={false}
          locale={locale}
        />

        {/* Main Content */}
        <motion.main
          className="flex-1 overflow-y-auto p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </motion.main>
      </div>
    </AceternitySidebar>
  );
}
