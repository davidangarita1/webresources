---
name: test-format
description: Applies AAA pattern for tests with no comments, uses mocks, keeps tests decoupled, writes descriptions in English. Use when writing or reviewing unit tests.
---

# Test Format

This skill enforces consistent, high-quality test standards following best practices.

## When to Use This Skill

Use this skill when:
- Writing new unit tests
- Writing test helpers or fixtures
- Reviewing test code
- Creating test utilities

## Principles

### AAA Pattern
```
describe("<component/function>", () => {
  describe("<scenario or method>", () => {
    it("<expected behavior>", () => {
      // Arrange: Setup test data and mocks
      // Act: Execute the action being tested
      // Assert: Verify the outcome
    });
  });
});
```

### No Comments
- Tests should be self-explanatory
- Use descriptive `it` statements instead of comments
- Good: `it("returns empty array when input is empty", () => {...})`
- Bad: `// Test empty input` followed by code

### Use Mocks
- Mock external dependencies (API, storage, timers)
- Mock complex calculations or utilities
- Use vi.fn() for function mocks
- Use vi.mock() for module mocking

### Decoupled Tests
- Each test should be independent
- Tests should not depend on execution order
- Reset mocks between tests
- Clean up after tests (cleanup functions)

### English Descriptions
- Write test names in English
- Use clear, descriptive it statements
- Format: "should <action> when <condition>"
- Examples:
  - `it("returns user by id when found")`
  - `it("throws error when invalid input")`
  - `it("calls onSave with data when form submits")`

## Structure

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe("<ModuleName/FunctionName>", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("<method or scenario>", () => {
    it("<expected behavior>", () => {
      const mockFn = vi.fn();
      
      const result = sut({ mockFn });
      
      expect(result).toBe(expected);
      expect(mockFn).toHaveBeenCalledWith(args);
    });
  });
});
```

## Checklist

- [ ] Uses AAA pattern (Arrange, Act, Assert)
- [ ] No inline comments in test body
- [ ] Uses mocks for external dependencies
- [ ] Test is independent (no shared state)
- [ ] Description in English, clear and concise
- [ ] Follows naming: `it("<action> when <condition>")`
- [ ] Resets mocks in beforeEach
- [ ] Cleans up after test if needed