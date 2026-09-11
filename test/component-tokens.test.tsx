import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { Dialog } from "@/components/atoms/Dialog";
import { Input } from "@/components/atoms/Input";

describe("data-ui 계약", () => {
  it("Button은 ui · variant · size를 단다", () => {
    render(<Button>x</Button>);
    const el = screen.getByRole("button");
    expect(el.getAttribute("data-ui")).toBe("button");
    expect(el.getAttribute("data-variant")).toBe("default");
    expect(el.getAttribute("data-size")).toBe("md");
  });

  it("명시한 variant · size가 그대로 실린다", () => {
    render(<Button variant="ghost" size="lg">x</Button>);
    const el = screen.getByRole("button");
    expect(el.getAttribute("data-variant")).toBe("ghost");
    expect(el.getAttribute("data-size")).toBe("lg");
  });

  it("호출자가 data-ui를 덮어쓰지 못한다", () => {
    render(<Button {...({ "data-ui": "sneaky" } as Record<string, string>)}>x</Button>);
    expect(screen.getByRole("button").getAttribute("data-ui")).toBe("button");
  });

  it("variant · size도 호출자가 덮어쓰지 못한다", () => {
    render(
      <Button
        variant="ghost"
        size="lg"
        {...({ "data-variant": "sneaky", "data-size": "sneaky" } as Record<string, string>)}
      >
        x
      </Button>,
    );
    const el = screen.getByRole("button");
    expect(el.getAttribute("data-variant")).toBe("ghost");
    expect(el.getAttribute("data-size")).toBe("lg");
  });

  it("Badge도 호출자가 덮어쓰지 못한다", () => {
    const { container } = render(
      <Badge
        variant="success"
        {...({ "data-ui": "sneaky", "data-variant": "sneaky" } as Record<string, string>)}
      >
        b
      </Badge>,
    );
    const el = container.querySelector('[data-ui="badge"]');
    expect(el).not.toBeNull();
    expect(el?.getAttribute("data-variant")).toBe("success");
  });

  it("Dialog Popup은 ui를 달고 L2 유틸리티를 쓴다", () => {
    render(
      <Dialog open>
        <Dialog.Content>
          <Dialog.Title>t</Dialog.Title>
        </Dialog.Content>
      </Dialog>,
    );
    const el = document.querySelector('[data-ui="dialog"]') as HTMLElement;
    expect(el).not.toBeNull();
    expect(el.className).toContain("rounded-dialog");
    expect(el.className).toContain("p-dialog");
    expect(el.className).toContain("shadow-dialog");
  });

  it("Input · Card · Badge도 단다", () => {
    const { container } = render(
      <>
        <Input aria-label="i" />
        <Card>c</Card>
        <Badge variant="success">b</Badge>
      </>,
    );
    expect(container.querySelector('[data-ui="input"]')).not.toBeNull();
    expect(container.querySelector('[data-ui="card"]')).not.toBeNull();
    expect(container.querySelector('[data-ui="badge"]')?.getAttribute("data-variant")).toBe("success");
  });
});

describe("L2 유틸리티 전환", () => {
  it("Button은 하드코딩된 크기·모서리 대신 토큰 유틸리티를 쓴다", () => {
    render(<Button>x</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).toContain("rounded-button");
    expect(cls).toContain("h-button-md");
    expect(cls).toContain("px-button-x-md");
    expect(cls).not.toMatch(/\brounded-full\b/);
    expect(cls).not.toMatch(/\bh-10\b/);
    expect(cls).not.toMatch(/\bduration-200\b/);
  });

  it("Input은 h-input · rounded-input을 쓴다", () => {
    const { container } = render(<Input aria-label="i" />);
    const cls = (container.querySelector('[data-ui="input"]') as HTMLElement).className;
    expect(cls).toContain("h-input");
    expect(cls).toContain("rounded-input");
    expect(cls).not.toMatch(/\brounded-xl\b/);
  });

  it("Card는 rounded-card · shadow-card를 쓴다", () => {
    const { container } = render(<Card>c</Card>);
    const cls = (container.querySelector('[data-ui="card"]') as HTMLElement).className;
    expect(cls).toContain("rounded-card");
    expect(cls).toContain("shadow-card");
    expect(cls).not.toMatch(/\brounded-2xl\b/);
  });

  it("arbitrary value를 쓰지 않는다 — duration만 예외", () => {
    render(<Button>x</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).not.toMatch(/\[var\(--/);
    expect(cls).toContain("duration-(--duration-normal)");
  });
});
