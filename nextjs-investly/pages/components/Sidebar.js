import Link from "next/link";
const Sidebar = () => {
  return (
    <nav className="sidebar">
      <Link href="/">
        <span className='logo'><img src={"/logo.png"} alt="Investly" /></span>
      </Link>
      <Link href="/dashboard"><span className="sidebar__link"><img src={"/icons/tab.png"} /> Dashboard</span></Link>
      <Link href="/units"><span className="sidebar__link"><img src={"/icons/business.png"} /> Available units</span></Link>
      <Link href="/invoices"><span className="sidebar__link"><img src={"/icons/verified-user.png"} /> Invoices</span></Link>
      <Link href="/projects"><span className="sidebar__link active"><img src={"/icons/watch-later.png"} /> Projects</span></Link>
      <Link href="/media"><span className="sidebar__link"><img src={"/icons/share.png"} /> Social media</span></Link>
      <Link href="/integrations"><span className="sidebar__link"><img src={"/icons/dashboard.png"} /> Integrations</span></Link>
      <Link href="/documentation"><span className="sidebar__link"><img src={"/icons/bookmarks.png"} /> Documentation</span></Link>

      <div className="sidebar__bottom">
        <Link href="/settings"><span className="sidebar__link"><img src={"/icons/settings.png"} /> Settings</span></Link>
        <Link href="/help-center"><span className="sidebar__link"><img src={"/icons/help-outline.png"} /> Help Center</span></Link>
      </div>

      <div className="sidebar__profile">
        <Link href="/settings"><span className="user"><img src={"/icons/avatar.png"} /> <p>Louise Thompson <span className="plan">Enterprise plan</span></p></span></Link>
      </div>
    </nav>
  );
};
export default Sidebar;
