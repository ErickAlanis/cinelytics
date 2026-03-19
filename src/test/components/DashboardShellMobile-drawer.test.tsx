import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { DashboardShell } from '../../features/dashboard/components/DashboardShell';

function TestShell() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DashboardShell
      sidebar={<div>Contenido lateral</div>}
      mobileTopbar={
        <button type="button" onClick={() => setIsOpen(true)}>
          Abrir menú
        </button>
      }
      isMobileSidebarOpen={isOpen}
      onCloseMobileSidebar={() => setIsOpen(false)}
    >
      <div>Contenido principal</div>
    </DashboardShell>
  );
}

describe('DashboardShell mobile drawer', () => {
  it('opens and closes the mobile sidebar drawer', async () => {
    const user = userEvent.setup();

    render(<TestShell />);

    expect(
      screen.queryByRole('dialog', { name: 'Marca y filtros' }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));

    expect(
      screen.getByRole('dialog', { name: 'Marca y filtros' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Cerrar' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cerrar' }));

    expect(
      screen.queryByRole('dialog', { name: 'Marca y filtros' }),
    ).not.toBeInTheDocument();
  });
});
