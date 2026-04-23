---
name: commit-message
description: Generates conventional commit messages following atomit format. Use when creating git commits to ensure consistent, descriptive messages under 50 characters.
---

# Commit Message

This skill generates concise, conventional commit messages following the atomit format.

## When to Use This Skill

Use this skill when:
- Creating git commits
- Writing PR titles
- Explaining code changes

## Format

```
<type>(<scope>): <description>
```

**Rules:**
- Max 50 characters for message
- Use lowercase for description
- Use imperative mood ("add" not "added")
- Types: feat, fix, refactor, test, docs, chore, style, perf

## Examples

```
feat(resources): add YouTube video embed support
fix(search): resolve fuzzy search timeout
refactor(store): simplify resource state
test(components): add ResourceCard tests
docs(readme): update installation steps
chore(deps): upgrade react-router to v7
style(css): fix indentation in sidebar
perf(list): implement virtual scrolling
```

## How to Generate

1. Analyze the changes (files modified, purpose)
2. Identify the type (feat/fix/refactor/test/docs/chore/style/perf)
3. Choose a scope (affected area or file)
4. Write a concise description (imperative, lowercase, max 50 chars)
5. Format as `type(scope): description`

## Tips

- `feat`: New feature or functionality
- `fix`: Bug fix
- `refactor`: Code change that doesn't fix bug or add feature
- `test`: Adding or updating tests
- `docs`: Documentation only
- `chore`: Maintenance, deps, build changes
- `style`: Formatting, no code logic change
- `perf`: Performance improvement