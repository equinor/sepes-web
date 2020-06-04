import React, { useContext, useState } from 'react';
import { UserConfig } from '../index'
import {
  Collapse,
  Navbar,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  NavbarBrand
} from 'reactstrap';
import Logo from './common/Logo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Brand = styled.div`
    display: flex;
    height: 2em;
    box-sizing: border-box;
    text-decoration: none;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `;

const Title = styled.span`
    font-weight: 500;
    margin-right: 2em;
    margin-left: 2em;
    font-size: 15px;
  `;

const NavBar = () => {
  const user = useContext(UserConfig);
  const [userDropDown, setUserDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const toggleUserDropdown = () => {
    setUserDropDown(!userDropDown);
  };
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (<>
    <Navbar
      style={{ paddingBottom: '0', color: 'red', backgroundColor: 'white' }}
      className="navbar-expand-sm navbar-toggleable-sm box-shadow mb-0"
      light
    >
      <Container fluid>
        <NavbarBrand tag={Link} to="/">
          <Brand>
            <Logo />
            <Title>
              Sepes
              </Title>
              </Brand>
          </NavbarBrand>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <Dropdown
                id="userIcon"
                isOpen={userDropDown}
                toggle={toggleUserDropdown}
              >
                <DropdownToggle color="link">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.4868 13.5107C25.8075 8.82976 18.1936 8.82976 13.5143 13.5107C11.8726 15.1531 10.7495 17.2163 10.2665 19.4776C9.79633 21.6794 9.95035 23.9606 10.7119 26.0744C10.8034 26.3283 11.0834 26.4599 11.3371 26.3684C11.5909 26.2769 11.7225 25.9969 11.631 25.7431C10.9312 23.8009 10.7898 21.705 11.2219 19.6817C11.6653 17.6054 12.6969 15.7103 14.2051 14.2016C18.5035 9.90171 25.4976 9.90171 29.796 14.2016C31.8431 16.2494 32.989 18.9715 33.0226 21.8664C33.0562 24.7561 31.9797 27.4999 29.9914 29.5922C29.9679 29.6169 29.9446 29.6418 29.9213 29.6668C29.8801 29.7108 29.839 29.755 29.796 29.798C25.4976 34.0979 18.5035 34.0979 14.2051 29.798C14.1822 29.7751 14.1599 29.7518 14.1378 29.7285C14.1367 29.6834 14.1357 29.6389 14.1357 29.5951C14.1357 29.4967 14.1376 29.3988 14.1412 29.3011C14.1424 29.2685 14.1448 29.2361 14.1465 29.2036C14.1497 29.1386 14.1527 29.0737 14.1574 29.0092C14.1602 28.9706 14.1644 28.9325 14.1678 28.8942C14.1729 28.8359 14.1777 28.7777 14.1841 28.7198C14.1886 28.6789 14.1944 28.6384 14.1996 28.5977C14.2065 28.5427 14.2131 28.4876 14.2212 28.4328C14.2274 28.3911 14.2347 28.3498 14.2416 28.3084C14.2503 28.2551 14.2587 28.2017 14.2686 28.1487C14.2763 28.1068 14.2852 28.0652 14.2937 28.0235C14.3042 27.9715 14.3145 27.9194 14.3261 27.8677C14.3354 27.8257 14.3458 27.784 14.3559 27.7423C14.3681 27.6914 14.3802 27.6405 14.3934 27.59C14.4044 27.5482 14.4163 27.5067 14.4278 27.465C14.4417 27.4152 14.4556 27.3653 14.4705 27.3158C14.4829 27.2742 14.4963 27.233 14.5095 27.1918C14.5251 27.1429 14.5407 27.0939 14.5573 27.0453C14.5713 27.0044 14.5859 26.9636 14.6006 26.9229C14.6179 26.8747 14.6353 26.8265 14.6536 26.7786C14.669 26.7381 14.6851 26.6981 14.7012 26.6579C14.7202 26.6106 14.7393 26.5633 14.7592 26.5164C14.7761 26.4765 14.7935 26.4369 14.8111 26.3973C14.8317 26.3508 14.8525 26.3045 14.874 26.2585C14.8923 26.2193 14.9111 26.1804 14.93 26.1415C14.9523 26.0958 14.9749 26.0502 14.998 26.005C15.0176 25.9668 15.0376 25.9287 15.0578 25.8907C15.0818 25.8458 15.1061 25.801 15.1309 25.7564C15.1519 25.719 15.173 25.6817 15.1945 25.6446C15.2201 25.6006 15.2461 25.5567 15.2725 25.5131C15.2947 25.4764 15.3172 25.44 15.34 25.4036C15.3672 25.3605 15.3948 25.3176 15.4228 25.275C15.4462 25.2392 15.4699 25.2036 15.4939 25.1683C15.5226 25.1259 15.552 25.0841 15.5816 25.0423C15.6063 25.0075 15.631 24.9728 15.6562 24.9386C15.6866 24.8972 15.7176 24.8562 15.7488 24.8155C15.7746 24.7818 15.8003 24.7481 15.8267 24.7148C15.8587 24.6743 15.8914 24.6343 15.9242 24.5945C15.951 24.5619 15.9778 24.5293 16.0051 24.4972C16.0388 24.4576 16.0733 24.4186 16.1078 24.3797C16.1356 24.3482 16.1633 24.3167 16.1916 24.2858C16.227 24.2472 16.263 24.2093 16.2992 24.1714C16.328 24.1411 16.3566 24.1108 16.3859 24.0809C16.423 24.0432 16.4608 24.0064 16.4986 23.9695C16.5282 23.9405 16.5576 23.9113 16.5878 23.8828C16.6267 23.846 16.6665 23.8101 16.7061 23.7741C16.7364 23.7466 16.7663 23.7189 16.797 23.6918C16.8379 23.6558 16.8799 23.6207 16.9217 23.5855C16.9523 23.5597 16.9826 23.5334 17.0136 23.508C17.0568 23.4727 17.1011 23.4384 17.1452 23.4039C17.176 23.3799 17.2063 23.3553 17.2374 23.3316C17.2839 23.2964 17.3313 23.2623 17.3787 23.2281C17.4086 23.2065 17.4379 23.1843 17.4682 23.1631C17.5205 23.1263 17.5739 23.0909 17.6273 23.0553C17.6536 23.0378 17.6793 23.0197 17.7057 23.0024C17.7753 22.9572 17.846 22.9135 17.9172 22.8703C17.9283 22.8636 17.9391 22.8565 17.9502 22.8498C18.0326 22.8004 18.1161 22.7526 18.2006 22.706C18.2295 22.6901 18.2592 22.6752 18.2885 22.6596C18.3446 22.6297 18.4005 22.5995 18.4575 22.5708C18.4941 22.5524 18.5315 22.5351 18.5684 22.5173C18.615 22.4947 18.6614 22.4719 18.7085 22.4502C19.5938 23.2961 20.7748 23.7751 22.0007 23.7751C23.2265 23.7751 24.4076 23.2961 25.2929 22.45C27.0212 23.2501 28.4356 24.6858 29.2036 26.4316C29.3122 26.6785 29.6003 26.7908 29.8473 26.6821C30.0942 26.5734 30.2063 26.285 30.0977 26.0381C29.2577 24.1284 27.7954 22.6024 25.9444 21.6812C26.4814 20.8931 26.772 19.9625 26.772 19.0022C26.772 16.3705 24.6316 14.2293 22.0007 14.2293C21.731 14.2293 21.5122 14.4481 21.5122 14.7179C21.5122 14.9877 21.731 15.2066 22.0007 15.2066C24.093 15.2066 25.7951 16.9093 25.7951 19.0022C25.7951 19.9381 25.4474 20.8393 24.8161 21.5396C24.816 21.5396 24.816 21.5397 24.8159 21.5398C24.0951 22.3393 23.069 22.7979 22.0006 22.7979C20.9322 22.7979 19.906 22.3393 19.1853 21.5398C19.1853 21.5396 19.1851 21.5396 19.1849 21.5395C18.5538 20.839 18.2062 19.938 18.2062 19.0023C18.2062 17.9808 18.606 17.0224 19.332 16.304C19.5238 16.1142 19.5254 15.8048 19.3356 15.613C19.1459 15.4211 18.8367 15.4196 18.6449 15.6093C17.732 16.5124 17.2293 17.7174 17.2293 19.002C17.2293 19.9613 17.5191 20.8912 18.0552 21.6789C18.0504 21.6813 18.0458 21.6839 18.0411 21.6863C18.003 21.7054 17.9658 21.7256 17.928 21.745C17.8701 21.775 17.8121 21.8048 17.755 21.836C17.7146 21.858 17.6751 21.8811 17.6352 21.9037C17.5818 21.9339 17.5284 21.9639 17.4758 21.9951C17.4351 22.0194 17.3949 22.0445 17.3545 22.0693C17.3041 22.1004 17.2536 22.1314 17.2039 22.1634C17.1632 22.1896 17.1233 22.2165 17.0832 22.2432C17.0349 22.2753 16.9867 22.3077 16.9392 22.3407C16.8992 22.3686 16.8597 22.397 16.8203 22.4254C16.7739 22.4589 16.7276 22.4925 16.6819 22.5268C16.6428 22.5562 16.6041 22.586 16.5655 22.616C16.5208 22.6508 16.4763 22.6858 16.4323 22.7214C16.3942 22.7521 16.3565 22.7833 16.3189 22.8147C16.2756 22.8508 16.2327 22.8874 16.1902 22.9244C16.1534 22.9564 16.1167 22.9886 16.0804 23.0213C16.0385 23.059 15.9971 23.0971 15.956 23.1356C15.9205 23.1687 15.8851 23.2019 15.8501 23.2357C15.8095 23.275 15.7695 23.3148 15.7296 23.3548C15.6956 23.3889 15.6616 23.4229 15.6282 23.4576C15.5887 23.4985 15.55 23.5402 15.5113 23.5819C15.479 23.6168 15.4464 23.6515 15.4147 23.6869C15.376 23.7299 15.3384 23.7738 15.3006 23.8175C15.2702 23.8527 15.2396 23.8875 15.2098 23.9231C15.1715 23.969 15.1344 24.0157 15.097 24.0623C15.0692 24.097 15.0409 24.1312 15.0136 24.1663C14.9744 24.2168 14.9365 24.2683 14.8984 24.3196C14.8744 24.3518 14.8498 24.3835 14.8264 24.4161C14.7782 24.4828 14.7316 24.5506 14.6853 24.6187C14.6732 24.6366 14.6603 24.654 14.6483 24.672C14.5907 24.758 14.5348 24.845 14.4803 24.9329C14.4615 24.9633 14.4439 24.9943 14.4255 25.0249C14.3902 25.0834 14.3548 25.1419 14.3209 25.2013C14.2997 25.2383 14.2797 25.276 14.2591 25.3134C14.2294 25.3672 14.1995 25.4207 14.171 25.4751C14.1498 25.5155 14.1298 25.5563 14.1092 25.5969C14.0827 25.6493 14.056 25.7017 14.0306 25.7547C14.0103 25.7969 13.991 25.8396 13.9714 25.882C13.9473 25.9344 13.9231 25.9866 13.9 26.0395C13.8809 26.0831 13.8627 26.127 13.8444 26.1709C13.8223 26.2236 13.8004 26.2763 13.7794 26.3294C13.7617 26.374 13.7448 26.4189 13.7279 26.4638C13.7078 26.517 13.6881 26.5704 13.669 26.624C13.6529 26.6696 13.6373 26.7153 13.6218 26.7612C13.6036 26.815 13.586 26.869 13.5689 26.9233C13.5543 26.9695 13.5402 27.0158 13.5264 27.0623C13.5101 27.1171 13.4944 27.172 13.4792 27.2272C13.4663 27.2738 13.4537 27.3205 13.4416 27.3674C13.4272 27.4232 13.4135 27.4792 13.4001 27.5354C13.389 27.5823 13.3779 27.6291 13.3676 27.6762C13.355 27.7331 13.3434 27.7904 13.332 27.8477C13.3226 27.8946 13.3131 27.9415 13.3045 27.9887C13.2938 28.0472 13.2842 28.1059 13.2747 28.1648C13.2672 28.2112 13.2593 28.2576 13.2525 28.3042C13.2437 28.3649 13.2362 28.426 13.2285 28.4871C13.2229 28.5323 13.2167 28.5775 13.2117 28.623C13.2047 28.687 13.1994 28.7514 13.1938 28.8158C13.19 28.8587 13.1855 28.9015 13.1824 28.9447C13.1772 29.0166 13.1738 29.0888 13.1703 29.1611C13.1686 29.197 13.1659 29.2327 13.1646 29.2687C13.1607 29.3772 13.1585 29.4861 13.1585 29.5953C13.1585 29.7133 13.1625 29.8249 13.1673 29.9481C13.1684 29.9766 13.1724 30.0043 13.1781 30.0314C13.1786 30.0335 13.1789 30.0356 13.1793 30.0377C13.1854 30.0643 13.1938 30.0899 13.204 30.1147C13.205 30.1171 13.2059 30.1195 13.2069 30.122C13.2174 30.1464 13.23 30.1697 13.2441 30.1919C13.2459 30.1946 13.2476 30.1974 13.2494 30.2001C13.264 30.2218 13.2802 30.2423 13.2979 30.2613C13.2992 30.2627 13.3001 30.2644 13.3014 30.2658L13.3658 30.3345C13.4145 30.3866 13.4632 30.4385 13.514 30.4893C15.8537 32.8298 18.9269 34 22.0003 34C25.0736 34 28.1469 32.8298 30.4866 30.4893C30.5374 30.4385 30.586 30.3865 30.6347 30.3345L30.6992 30.2658C32.8638 27.9879 34.0357 25.0012 33.9992 21.8554C33.9628 18.7034 32.7153 15.74 30.4868 13.5107Z"
                      fill="black"
                    />
                  </svg>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>{user.getAccount().name}</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => user.logout()}>Sign out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            </ul>
        </Container>
      </Navbar>
    </>);
    }

export default NavBar;