import React from 'react';
import Link from 'next/link';
import { styled } from '@mui/system';

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  noUnderline?: boolean;
};

const Anchor = styled('a')((props: NavLinkProps) => {
  return {
    textDecoration: 'none',
    color: 'inherit',

    ':hover': {
      textDecoration: props.noUnderline ? 'none' : 'underline',
    },
  };
});

export function NavLink({ href, ...props }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <Anchor {...props} />
    </Link>
  );
}
