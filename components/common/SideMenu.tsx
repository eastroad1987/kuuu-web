'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface SubMenuItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  href: string;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Crafts',
    href: '/crafts',
    subItems: [
      { title: 'Photos', href: '/crafts/photos' },
      { title: 'Sewing', href: '/crafts/sewing' },
      { title: 'Accessories', href: '/crafts/accessories' },
      { title: 'Garlands', href: '/crafts/garlands' },
      { title: 'Wreaths', href: '/crafts/wreaths' },
      { title: 'Gifts', href: '/crafts/gifts' },
    ]
  },
  {
    title: 'Decor + DIY',
    href: '/decor',
    subItems: [
      { title: 'Living', href: '/decor/living' },
      { title: 'Dining', href: '/decor/dining' },
      { title: 'Kitchen', href: '/decor/kitchen' },
      { title: 'Bed', href: '/decor/bed' },
      { title: 'Bath', href: '/decor/bath' },
      { title: 'Office', href: '/decor/office' },
      { title: 'Small Spaces', href: '/decor/small-spaces' },
      { title: 'Outdoor', href: '/decor/outdoor' },
      { title: 'Plants', href: '/decor/plants' },
      { title: 'Tours', href: '/decor/tours' },
    ]
  },
  {
    title: 'Recipes',
    href: '/recipes',
    subItems: [
      { title: 'Breakfast', href: '/recipes/breakfast' },
      { title: 'Dinner + Lunch', href: '/recipes/dinner-lunch' },
      { title: 'Desserts', href: '/recipes/desserts' },
      { title: 'Snacks + Appetizers', href: '/recipes/snacks' },
      { title: 'Cocktails', href: '/recipes/cocktails' },
      { title: 'Drinks', href: '/recipes/drinks' },
      { title: 'Air Fryer', href: '/recipes/air-fryer' },
    ]
  },
  {
    title: 'Style',
    href: '/style',
    subItems: [
      { title: 'Hair', href: '/style/hair' },
      { title: 'Makeup', href: '/style/makeup' },
      { title: 'Sister Style', href: '/style/sister-style' },
      { title: 'Skin Care', href: '/style/skin-care' },
    ]
  },
];



interface SideMenuProps {
  onClose: () => void;
}

const SideMenu = ({ onClose }: SideMenuProps) => {
  const pathname = usePathname();

  return (
    <nav className="side-menu-content">
      <div className="side-menu-header">
        <button 
          className="close-button"
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
      </div>

      <div className="side-menu-links">
        {menuItems.map((item) => (
          <div key={item.href} className="menu-item">
            <Link 
              href={item.href}
              className={`menu-link ${pathname === item.href ? 'active' : ''}`}
              onClick={onClose}
            >
              {item.title}
            </Link>
            
            {item.subItems && (
              <div className="submenu">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={`submenu-link ${pathname === subItem.href ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default SideMenu;