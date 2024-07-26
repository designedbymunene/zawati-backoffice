import React, { PropsWithChildren } from "react";
import {
	BanknoteIcon,
	ContactIcon,
	Goal,
	HomeIcon,
	LockIcon,
	Monitor,
	PercentIcon,
	PiggyBankIcon,
	TagIcon,
	User2,
	UserCog2,
	UsersIcon,
} from "lucide-react";

import AnchorLink from "./anchorLink";

const Sidebar = (props: PropsWithChildren) => {
	return (
		<aside
			id="logo-sidebar"
			className="flex flex-col fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-black dark:border-gray-700"
			aria-label="Sidebar"
		>
			<div className="flex-grow overflow-y-auto overflow-x-hidden">
				<ul className="flex flex-col py-4 space-y-1">
					<li className="px-5">
						<div className="flex flex-row items-center h-8">
							<div className="text-sm font-light tracking-wide text-gray-500">
								Menu
							</div>
						</div>
					</li>
					<AnchorLink href="/dashboard" title="Dashboard" icon={<HomeIcon />} />

					<AnchorLink
						href="/dashboard/groups"
						title="Groups"
						icon={<ContactIcon />}
					/>
					<AnchorLink
						href="/dashboard/members"
						title="Members"
						icon={<UsersIcon />}
					/>
					<AnchorLink
						href="/dashboard/goals"
						title="Goals"
						icon={<Goal />}
					/>
					<AnchorLink
						href="/dashboard/products"
						title="Products"
						icon={<TagIcon />}
					/>
					<AnchorLink
						href="/dashboard/loans"
						title="Disbursements / Loans"
						icon={<BanknoteIcon />}
					/>
					<AnchorLink
						href="/dashboard/savings"
						title="Contributions / Savings"
						icon={<PiggyBankIcon />}
					/>
					<AnchorLink
						href="/dashboard/dividends"
						title="Dividends"
						icon={<PercentIcon />}
					/>
					<AnchorLink href="/dashboard/users" title="User" icon={<User2 />} />
					<AnchorLink
						href="/dashboard/audits"
						title="Audits"
						icon={<Monitor />}
					/>
					<AnchorLink
						href="/dashboard/permissions"
						title="Permission"
						icon={<LockIcon />}
					/>
					<AnchorLink
						href="/dashboard/roles"
						title="Role"
						icon={<UserCog2 />}
					/>

					{/* <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">
                Application
              </div>
            </div>
          </li>
          <AnchorLink href="/profile" title="Profile" icon={<UserCog />} />
          <AnchorLink
            href="/settings"
            title="Settings"
            icon={<SettingsIcon />}
          /> */}
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
