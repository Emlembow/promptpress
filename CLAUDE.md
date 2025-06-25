# Claude AI Assistant Rules

# AI Coding Assistant Rules

You are an expert software developer assistant. Follow these comprehensive guidelines when helping with code:

## Project Context
- Primary language: typescript

# TypeScript Development Rules

## Type System Best Practices
- Enable strict mode in tsconfig.json (`"strict": true`)
- Prefer interfaces over type aliases for object shapes
- Use type aliases for unions, intersections, and complex types
- Avoid `any` type - use `unknown` for truly unknown types
- Leverage TypeScript's utility types (Partial, Required, Pick, Omit, etc.)
- Use const assertions for literal types
- Implement proper generic constraints
- Use conditional types for advanced type manipulation

## Naming Conventions
- **Types/Interfaces**: PascalCase (e.g., `UserProfile`, `ApiResponse`)
- **Variables/Functions**: camelCase (e.g., `getUserData`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)
- **Enums**: PascalCase for name, UPPER_SNAKE_CASE for values
- **Type Parameters**: Single letter (T, K, V) or descriptive (TData, TError)
- Boolean variables should start with `is`, `has`, `should`, `can`
- Prefix interfaces with 'I' only if it adds clarity (generally avoid)

## Type Definitions
- Define explicit return types for public functions
- Use type inference for local variables when obvious
- Create dedicated types for function parameters when complex
- Use mapped types to maintain consistency
- Implement branded types for type-safe IDs
- Use template literal types for string patterns
- Leverage const enums for performance when possible

## Function Guidelines
- Prefer arrow functions for consistency
- Use function overloads for multiple signatures
- Implement default parameters over optional ones
- Use rest parameters with proper typing
- Return early to reduce nesting
- Keep functions focused and small
- Use async/await over Promise chains
- Type guard functions should return `param is Type`

## Interface & Type Organization
- One interface/type per file for large definitions
- Group related types in namespace or modules
- Export types alongside their implementations
- Use index.ts for barrel exports
- Place shared types in a dedicated types directory
- Colocate component prop types with components
- Document complex types with JSDoc comments

## Null Safety & Error Handling
- Use strict null checks (`strictNullChecks: true`)
- Prefer optional chaining (?.) and nullish coalescing (??)
- Create Result<T, E> or Option<T> types for safer error handling
- Use discriminated unions for error states
- Implement custom error classes extending Error
- Use type predicates for narrowing
- Handle all possible cases in switch statements

## Generics Best Practices
- Use meaningful names for type parameters
- Apply appropriate constraints to generics
- Avoid over-genericizing - be specific when needed
- Use default type parameters when sensible
- Leverage generic inference when possible
- Create generic utility functions for reusability
- Document generic constraints clearly

## React + TypeScript
- Use `React.FC` sparingly (prefer explicit return types)
- Type event handlers properly (e.g., `React.MouseEvent<HTMLButtonElement>`)
- Use proper types for refs (`useRef<HTMLDivElement>(null)`)
- Type custom hooks return values explicitly
- Use discriminated unions for component props variants
- Leverage component prop interfaces with children
- Type context values appropriately

## Advanced Patterns
- **Builder Pattern**: For complex object construction
- **Factory Pattern**: For creating instances with proper types
- **Strategy Pattern**: Using discriminated unions
- **Repository Pattern**: With generic constraints
- **Dependency Injection**: Using interfaces
- **Decorators**: When using experimental features
- **Mixins**: For composable functionality

## Code Quality Rules
- No implicit any (`noImplicitAny: true`)
- Enable all strict checks in tsconfig
- Use ESLint with TypeScript plugins
- Run type checking in CI/CD pipeline
- Keep type coverage above 95%
- Avoid type assertions - use type guards
- Don't use @ts-ignore - fix the issue or use @ts-expect-error
- Regular dependency updates for type definitions

## Module System
- Use ES modules (import/export)
- Avoid namespace declarations in modern code
- Use path aliases for cleaner imports
- Configure module resolution properly
- Separate type imports (`import type`)
- Use dynamic imports for code splitting
- Handle circular dependencies carefully

## Testing Types
- Type test utilities and mocks properly
- Use type stubs for external dependencies
- Create test-specific types when needed
- Ensure test types match implementation
- Use partial mocks with type safety
- Type custom matchers properly
- Maintain separate test tsconfig if needed

## Performance Considerations
- Use const enums for compile-time constants
- Avoid excessive type computations
- Use type imports to reduce bundle size
- Leverage incremental compilation
- Configure skipLibCheck for faster builds
- Use Project References for large codebases
- Monitor TypeScript compilation performance

## Documentation
- Use TSDoc comments for public APIs
- Document generic constraints
- Provide examples in comments
- Document breaking changes in types
- Use @deprecated tag appropriately
- Generate documentation from types
- Keep README updated with type information

## Development Best Practices

# Clean Code Development Rules

## Naming Conventions
- Use meaningful and pronounceable variable names
- Use searchable names (avoid single letters or numeric constants)
- Avoid mental mapping - be explicit
- Class names should be nouns (Customer, Account)
- Method names should be verbs (getName, calculateTotal)
- Use consistent naming throughout the codebase
- Avoid abbreviations unless universally understood
- Use intention-revealing names

## Functions & Methods
- Functions should do one thing only
- Keep functions small (ideally < 20 lines)
- Use descriptive function names
- Limit function parameters (ideally ≤ 3)
- Functions should have no side effects
- Use pure functions when possible
- Extract complex conditionals into functions
- Avoid flag arguments - split into multiple functions

## Code Organization
- Keep related functionality close together
- Organize code from high level to low level
- Group similar functions
- Maintain consistent file structure
- Use meaningful file and folder names
- Keep files focused and small
- Separate concerns appropriately
- Follow established patterns in the codebase

## Comments & Documentation
- Code should be self-documenting
- Use comments to explain "why," not "what"
- Keep comments up-to-date with code changes
- Remove commented-out code
- Document complex algorithms
- Write meaningful commit messages
- Document APIs and public interfaces
- Avoid redundant comments

## Error Handling
- Use exceptions rather than error codes
- Create meaningful error messages
- Handle errors at the appropriate level
- Don't ignore or suppress errors
- Log errors with context
- Fail fast when appropriate
- Use custom exceptions for domain errors
- Clean up resources in finally blocks

## Code Simplicity
- Avoid clever code - write obvious code
- Reduce cyclomatic complexity
- Eliminate dead code
- Avoid premature optimization
- Extract magic numbers to constants
- Use early returns to reduce nesting
- Simplify conditional expressions
- Remove unnecessary complexity

## DRY Principle
- Don't Repeat Yourself
- Extract common code into functions
- Create reusable components
- Use configuration over duplication
- Centralize business rules
- Avoid copy-paste programming
- Maintain single source of truth
- Balance DRY with readability

## SOLID Principles
- **Single Responsibility**: Classes should have one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Derived classes must be substitutable
- **Interface Segregation**: Many specific interfaces are better
- **Dependency Inversion**: Depend on abstractions, not concretions

## Testing Principles
- Write tests first (TDD when appropriate)
- Keep tests simple and focused
- Use descriptive test names
- Test one concept per test
- Keep tests independent
- Use meaningful test data
- Maintain test code quality
- Aim for high coverage of critical paths

## Refactoring Guidelines
- Refactor in small steps
- Run tests after each change
- Keep refactoring separate from features
- Remove duplication
- Improve names
- Simplify conditionals
- Extract methods and classes
- Leave code better than you found it

## Performance Considerations
- Measure before optimizing
- Optimize algorithms before code
- Consider space-time tradeoffs
- Cache expensive operations
- Use appropriate data structures
- Avoid premature optimization
- Profile to find bottlenecks
- Document performance decisions

## Code Reviews
- Review code regularly
- Focus on correctness first
- Check for maintainability
- Ensure consistent style
- Look for potential bugs
- Verify test coverage
- Provide constructive feedback
- Learn from reviews

## Version Control
- Make small, focused commits
- Write clear commit messages
- Use branching strategies effectively
- Keep main/master branch stable
- Review before merging
- Tag releases appropriately
- Document breaking changes
- Maintain clean history

## Security Practices
- Validate all inputs
- Sanitize user data
- Use parameterized queries
- Don't store sensitive data in code
- Keep dependencies updated
- Follow principle of least privilege
- Implement proper authentication
- Log security events

## Team Practices
- Follow team conventions
- Communicate design decisions
- Document architectural choices
- Share knowledge regularly
- Pair program complex features
- Maintain coding standards
- Use linters and formatters
- Automate repetitive tasks

## Continuous Improvement
- Learn from mistakes
- Stay updated with best practices
- Refactor legacy code gradually
- Measure code quality metrics
- Address technical debt
- Experiment with new approaches
- Share learnings with team
- Maintain a growth mindset

# Git Workflow & Version Control Rules

## Gitflow Workflow

### Main Branches
- **main/master**: Production-ready code only
  - Never commit directly
  - Only merge from release/* and hotfix/*
  - Tag with version after each merge
  - Protected branch with strict rules

- **develop**: Integration branch for features
  - Latest development changes
  - Source for feature branches
  - Never commit directly
  - Merge feature branches here

### Supporting Branches
- **feature/***: New features
  - Branch from: develop
  - Merge to: develop
  - Naming: `feature/[issue-id]-description`
  - Example: `feature/123-user-authentication`
  - Delete after merge

- **release/***: Prepare production releases
  - Branch from: develop
  - Merge to: main AND develop
  - Naming: `release/vX.Y.Z`
  - Only fixes and release tasks
  - No new features

- **hotfix/***: Emergency production fixes
  - Branch from: main
  - Merge to: main AND develop
  - Naming: `hotfix/vX.Y.Z`
  - Urgent fixes only
  - Delete after merge

## Commit Message Convention

### Format
```
type(scope): subject

[optional body]

[optional footer(s)]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Formatting (no code change)
- **refactor**: Code restructuring
- **perf**: Performance improvements
- **test**: Adding/updating tests
- **build**: Build system changes
- **ci**: CI configuration changes
- **chore**: Other changes
- **revert**: Revert previous commit

### Examples
```
feat(auth): add OAuth2 integration

fix(api): handle null response in user endpoint

docs(readme): update installation instructions

refactor(utils): simplify date formatting logic
```

## Semantic Versioning
- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features (backward compatible)
- **PATCH** (0.0.X): Bug fixes (backward compatible)
- Pre-release: X.Y.Z-alpha.1, X.Y.Z-beta.2
- Build metadata: X.Y.Z+20130313144700

## Branch Protection Rules
- Require pull request reviews (min 1-2)
- Require status checks to pass
- Require branches to be up to date
- Dismiss stale reviews
- Require code owner reviews
- No force pushes allowed
- No branch deletion
- Include administrators

## Pull Request Guidelines

### Before Creating PR
- Update branch with latest develop/main
- Run all tests locally
- Check code formatting
- Update documentation
- Self-review changes
- Ensure single logical change

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.logs or debug code
```

### Code Review Process
- Respond to feedback promptly
- Keep discussions professional
- Focus on code, not person
- Suggest improvements
- Approve when satisfied
- Squash commits if needed

## Git Best Practices

### Committing
- Commit early and often
- Make atomic commits
- Write meaningful messages
- Don't commit broken code
- Avoid large binary files
- Use .gitignore properly
- Sign commits when required
- Keep history clean

### Branching
- Keep branches short-lived
- One feature per branch
- Update frequently from base
- Use descriptive names
- Clean up old branches
- Avoid deep branch nesting
- Test before merging
- Use fast-forward when possible

### Merging Strategies
- **Feature → Develop**: Squash and merge
- **Release → Main**: Create merge commit
- **Hotfix → Main**: Create merge commit
- **Back-merges**: Create merge commit
- Resolve conflicts carefully
- Test after merging
- Update related issues
- Notify team of major merges

## Release Process
1. Create release branch from develop
2. Update version numbers
3. Update changelog
4. Fix release-specific issues
5. Create PR to main
6. Get required approvals
7. Merge to main
8. Tag release with version
9. Create GitHub release
10. Merge back to develop
11. Delete release branch
12. Deploy to production

## Hotfix Process
1. Create hotfix branch from main
2. Fix critical issue
3. Update patch version
4. Test thoroughly
5. Create PR to main
6. Get emergency approval
7. Merge to main
8. Tag hotfix version
9. Deploy immediately
10. Merge back to develop
11. Delete hotfix branch
12. Document incident

## Git Commands Reference

### Daily Workflow
```bash
git fetch origin
git checkout -b feature/new-feature origin/develop
git add -p  # Stage changes interactively
git commit -m "feat: add new feature"
git push -u origin feature/new-feature
```

### Keeping Updated
```bash
git checkout develop
git pull origin develop
git checkout feature/branch
git rebase develop  # or merge
```

### Cleaning Up
```bash
git branch -d feature/completed
git remote prune origin
git gc --aggressive
```

## Team Conventions
- Agree on workflow rules
- Document exceptions
- Use consistent naming
- Automate where possible
- Regular branch cleanup
- Monitor repo health
- Train new members
- Review and adapt process

# Performance Optimization Rules

## Performance Analysis

### Measurement First
- **Measure before optimizing**: Use profilers and monitoring tools
- **Identify bottlenecks**: Focus on the critical path
- **Set performance budgets**: Define acceptable thresholds
- **Monitor continuously**: Track performance over time
- **Use real user metrics**: Measure actual user experience
- **A/B test optimizations**: Validate improvements
- **Document baselines**: Keep performance history
- **Automate monitoring**: Set up alerts

### Key Metrics
- **Time to First Byte (TTFB)**: Server response time
- **First Contentful Paint (FCP)**: First visual feedback
- **Largest Contentful Paint (LCP)**: Main content visible
- **First Input Delay (FID)**: Interactivity readiness
- **Cumulative Layout Shift (CLS)**: Visual stability
- **Total Blocking Time (TBT)**: Main thread blocking
- **Time to Interactive (TTI)**: Fully interactive
- **Custom business metrics**: User-specific actions

## Frontend Performance

### JavaScript Optimization
```javascript
// Code splitting
const LazyComponent = lazy(() => import('./LazyComponent'));

// Tree shaking - use named imports
import { debounce } from 'lodash-es'; // Good
import _ from 'lodash'; // Bad - imports everything

// Memoization
const expensiveValue = useMemo(() => 
  computeExpensiveValue(a, b), [a, b]
);

// Virtualization for long lists
<VirtualList
  height={600}
  itemCount={10000}
  itemSize={50}
  renderItem={renderRow}
/>
```

### Bundle Optimization
- **Code splitting**: Split by routes and components
- **Tree shaking**: Remove unused code
- **Minification**: Compress JavaScript/CSS
- **Compression**: Use Gzip/Brotli
- **Source maps**: Separate from production
- **Lazy loading**: Load on demand
- **Preloading**: Critical resources
- **Module federation**: Share dependencies

### Asset Optimization
```html
<!-- Responsive images -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>

<!-- Preload critical assets -->
<link rel="preload" href="font.woff2" as="font" crossorigin>
<link rel="preload" href="critical.css" as="style">

<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="https://api.example.com">
```

### CSS Performance
```css
/* Critical CSS inline */
<style>
  /* Above-the-fold styles */
  .hero { /* ... */ }
</style>

/* Non-critical CSS async -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

/* CSS containment */
.widget {
  contain: layout style paint;
}

/* GPU acceleration */
.animated {
  will-change: transform;
  transform: translateZ(0);
}
```

### Rendering Optimization
- **Minimize reflows**: Batch DOM updates
- **Use CSS transforms**: GPU accelerated
- **Debounce events**: Limit execution frequency
- **Use requestAnimationFrame**: For animations
- **Optimize paint areas**: Reduce paint complexity
- **Layer promotion**: Use will-change carefully
- **Virtual scrolling**: For long lists
- **Progressive rendering**: Show content incrementally

## Backend Performance

### Database Optimization
```sql
-- Use indexes effectively
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Optimize queries
-- Bad: N+1 query
SELECT * FROM users;
SELECT * FROM orders WHERE user_id = ?; -- Called N times

-- Good: Join or eager loading
SELECT u.*, o.* 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id;

-- Use prepared statements
PREPARE stmt FROM 'SELECT * FROM users WHERE id = ?';
EXECUTE stmt USING @user_id;
```

### Query Optimization
- **Use EXPLAIN**: Analyze query execution plans
- **Proper indexing**: Index frequently queried columns
- **Avoid N+1 queries**: Use joins or eager loading
- **Limit result sets**: Use pagination
- **Cache query results**: Redis/Memcached
- **Denormalize when needed**: Trade space for speed
- **Partition large tables**: Improve query performance
- **Use read replicas**: Distribute read load

### API Optimization
```javascript
// Implement caching
app.get('/api/products', cache('5 minutes'), async (req, res) => {
  const products = await getProducts();
  res.json(products);
});

// Use compression
app.use(compression());

// Implement pagination
app.get('/api/users', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const users = await User.find()
    .limit(limit)
    .skip((page - 1) * limit);
  res.json(users);
});

// Use field filtering
app.get('/api/users/:id', async (req, res) => {
  const fields = req.query.fields?.split(',') || [];
  const user = await User.findById(req.params.id).select(fields);
  res.json(user);
});
```

### Server Optimization
- **Use HTTP/2**: Multiplexing and server push
- **Enable compression**: Gzip/Brotli
- **Implement caching**: Browser, CDN, server
- **Use connection pooling**: Database connections
- **Horizontal scaling**: Load balancing
- **Async operations**: Non-blocking I/O
- **Queue background jobs**: Don't block requests
- **Monitor resource usage**: CPU, memory, disk

## Caching Strategies

### Cache Levels
```javascript
// Browser cache
res.setHeader('Cache-Control', 'public, max-age=31536000');

// CDN cache
res.setHeader('CDN-Cache-Control', 'public, max-age=3600');

// Application cache
const cachedData = await redis.get(cacheKey);
if (cachedData) return JSON.parse(cachedData);

// Database query cache
const users = await db.query('SELECT * FROM users', {
  cache: true,
  cacheDuration: 60000
});
```

### Cache Invalidation
- **TTL-based**: Automatic expiration
- **Event-based**: Invalidate on updates
- **Tag-based**: Group related caches
- **Versioning**: Cache keys with versions
- **Partial invalidation**: Update specific items
- **Warm cache**: Preload critical data
- **Cache stampede prevention**: Lock during rebuild
- **Monitor hit rates**: Track effectiveness

## Network Optimization

### HTTP Optimization
```nginx
# Enable HTTP/2
listen 443 ssl http2;

# Enable compression
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# Set proper cache headers
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Enable keep-alive
keepalive_timeout 65;
keepalive_requests 100;
```

### CDN Usage
- **Static assets**: Images, CSS, JavaScript
- **Geographic distribution**: Reduce latency
- **Edge computing**: Process at edge
- **Cache warming**: Preload popular content
- **Purge strategies**: Invalidate stale content
- **Security features**: DDoS protection
- **Compression**: At edge level
- **HTTP/3 support**: QUIC protocol

## Mobile Performance

### Mobile-Specific Optimizations
- **Reduce payload size**: Smaller bundles
- **Optimize images**: Use appropriate formats
- **Minimize network requests**: Bundle resources
- **Use service workers**: Offline functionality
- **Implement lazy loading**: Load visible content
- **Reduce JavaScript**: Less parsing/execution
- **Optimize fonts**: Subset and preload
- **Test on real devices**: Actual performance

### Progressive Web App (PWA)
```javascript
// Service worker for caching
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/script.js',
        '/offline.html'
      ]);
    })
  );
});

// Cache-first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

## Monitoring & Profiling

### Performance Monitoring Tools
- **Browser DevTools**: Chrome/Firefox profilers
- **Lighthouse**: Automated auditing
- **WebPageTest**: Detailed analysis
- **New Relic/DataDog**: APM solutions
- **Google Analytics**: Real user metrics
- **Sentry**: Error and performance
- **Custom metrics**: Business-specific
- **Synthetic monitoring**: Automated tests

### Continuous Performance Testing
```javascript
// Performance budget in CI/CD
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    budgets: [{
      path: '/*',
      resourceSizes: [
        { resourceType: 'script', budget: 300 },
        { resourceType: 'total', budget: 1000 }
      ],
      resourceCounts: [
        { resourceType: 'third-party', budget: 10 }
      ]
    }]
  }
};
```

## Performance Best Practices

### General Guidelines
- **Performance budget**: Set and enforce limits
- **Progressive enhancement**: Basic functionality first
- **Optimize critical path**: Prioritize visible content
- **Reduce complexity**: Simpler is faster
- **Async everything**: Non-blocking operations
- **Cache aggressively**: But invalidate properly
- **Monitor continuously**: Catch regressions
- **Iterate and improve**: Continuous optimization

### Common Pitfalls
- Premature optimization
- Optimizing the wrong things
- Not measuring impact
- Ignoring mobile performance
- Over-engineering solutions
- Neglecting perceived performance
- Not considering user context
- Forgetting about maintenance

## Performance Checklist
- [ ] Measure baseline performance
- [ ] Set performance budgets
- [ ] Optimize critical rendering path
- [ ] Implement code splitting
- [ ] Optimize images and assets
- [ ] Enable compression
- [ ] Implement caching strategy
- [ ] Optimize database queries
- [ ] Use CDN for static assets
- [ ] Monitor real user metrics
- [ ] Set up performance alerts
- [ ] Regular performance audits

# Security Development Rules

## Authentication Best Practices

### Password Security
- Use bcrypt, scrypt, or Argon2 for hashing
- Implement proper salt rounds (min 10 for bcrypt)
- Never store plain text passwords
- Enforce strong password policies
- Implement password history
- Use secure password reset flows
- Rate limit login attempts
- Implement account lockout mechanisms

### Multi-Factor Authentication (MFA)
- Support TOTP (Time-based One-Time Password)
- Implement backup codes
- Use SMS as last resort (SIM swapping risk)
- Support hardware tokens (FIDO2/WebAuthn)
- Provide recovery mechanisms
- Log MFA events
- Allow users to manage devices
- Implement risk-based authentication

### Session Management
- Use secure, httpOnly, sameSite cookies
- Implement proper session expiration
- Regenerate session IDs after login
- Invalidate sessions on logout
- Implement idle timeout
- Use secure session storage
- Monitor concurrent sessions
- Implement "remember me" securely

### JWT Best Practices
- Use short expiration times
- Implement refresh token rotation
- Store sensitive data server-side
- Use strong signing algorithms (RS256)
- Validate all claims
- Implement proper revocation
- Don't store tokens in localStorage
- Use secure transmission only

## Authorization

### Access Control
- Implement least privilege principle
- Use Role-Based Access Control (RBAC)
- Consider Attribute-Based Access Control (ABAC)
- Validate permissions on every request
- Implement resource-level permissions
- Use policy-based authorization
- Audit authorization decisions
- Implement deny-by-default

### API Security
- Use API keys for service authentication
- Implement rate limiting per user/IP
- Use OAuth 2.0 for third-party access
- Validate all inputs
- Implement request signing
- Use API versioning
- Monitor API usage
- Implement circuit breakers

## Input Validation & Sanitization

### Validation Rules
- Validate on both client and server
- Use whitelist validation
- Check data types and ranges
- Validate file uploads thoroughly
- Limit input sizes
- Use parameterized queries
- Escape output based on context
- Implement content security policies

### SQL Injection Prevention
```sql
-- Never do this
query = "SELECT * FROM users WHERE id = " + userId

-- Always use parameterized queries
query = "SELECT * FROM users WHERE id = ?"
```

### XSS Prevention
- Escape HTML entities
- Use Content Security Policy (CSP)
- Validate URLs
- Sanitize rich text input
- Use templating engines with auto-escaping
- Avoid innerHTML with user data
- Implement strict MIME type checking
- Use X-Content-Type-Options header

## Secure Communication

### HTTPS/TLS
- Use TLS 1.2 minimum
- Implement HSTS (HTTP Strict Transport Security)
- Use secure cipher suites
- Implement certificate pinning for mobile
- Redirect HTTP to HTTPS
- Use secure cookies
- Implement OCSP stapling
- Regular certificate renewal

### Security Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=()
```

## Data Protection

### Encryption at Rest
- Encrypt sensitive data in database
- Use field-level encryption when needed
- Implement key rotation
- Use hardware security modules (HSM)
- Encrypt backups
- Secure key storage
- Implement data masking
- Use transparent data encryption

### Encryption in Transit
- Use TLS for all communications
- Implement end-to-end encryption for sensitive data
- Use VPN for internal communications
- Encrypt API payloads when necessary
- Implement message-level security
- Use secure protocols only
- Monitor for protocol downgrades
- Implement perfect forward secrecy

### Personal Data Protection (GDPR/CCPA)
- Implement data minimization
- Provide data portability
- Implement right to deletion
- Maintain audit logs
- Get explicit consent
- Implement privacy by design
- Regular privacy assessments
- Document data processing

## Infrastructure Security

### Container Security
```dockerfile
# Run as non-root user
FROM node:alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Copy only necessary files
COPY --chown=nodejs:nodejs . .
```

### Kubernetes Security
```yaml
apiVersion: v1
kind: Pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
```

### Cloud Security
- Use IAM roles instead of keys
- Implement least privilege
- Enable cloud audit logs
- Use VPC and security groups
- Implement network segmentation
- Regular security assessments
- Use cloud-native security tools
- Implement defense in depth

## Security Monitoring

### Logging & Auditing
- Log authentication events
- Monitor authorization failures
- Track data access
- Log security exceptions
- Implement centralized logging
- Use structured logging
- Protect log integrity
- Regular log analysis

### Intrusion Detection
- Implement rate limiting
- Detect brute force attacks
- Monitor for SQL injection attempts
- Track unusual access patterns
- Use Web Application Firewall (WAF)
- Implement honeypots
- Regular security scans
- Incident response plan

### Security Testing
- Regular penetration testing
- Automated security scanning
- Dependency vulnerability scanning
- Static code analysis
- Dynamic application testing
- Security code reviews
- Bug bounty programs
- Red team exercises

## Secure Development Lifecycle

### Code Security
- Never hardcode secrets
- Use environment variables
- Implement secret rotation
- Regular dependency updates
- Security-focused code reviews
- Use security linters
- Implement git-secrets
- Secure CI/CD pipelines

### Third-Party Dependencies
- Regular vulnerability scanning
- Use lock files
- Monitor security advisories
- Implement Software Bill of Materials (SBOM)
- Vendor security assessment
- License compliance
- Supply chain security
- Regular updates

### Incident Response
- Incident response plan
- Security team contacts
- Escalation procedures
- Communication templates
- Post-mortem process
- Regular drills
- Lessons learned
- Continuous improvement

## OWASP Top 10 Prevention

1. **Injection**: Use parameterized queries
2. **Broken Authentication**: Implement secure session management
3. **Sensitive Data Exposure**: Encrypt sensitive data
4. **XML External Entities**: Disable XML external entity processing
5. **Broken Access Control**: Implement proper authorization
6. **Security Misconfiguration**: Harden all components
7. **XSS**: Validate and escape all inputs
8. **Insecure Deserialization**: Validate serialized objects
9. **Vulnerable Components**: Keep dependencies updated
10. **Insufficient Logging**: Implement comprehensive logging

## Security Best Practices Summary
- Security by design
- Defense in depth
- Least privilege principle
- Regular security updates
- Continuous monitoring
- Incident preparedness
- Security awareness training
- Regular security assessments

## Custom Project Rules

# CLAUDE.md - Building TypeScript Web Apps for GitHub Pages

This guide outlines the process for building a TypeScript web application that can be deployed to GitHub Pages.

## Overview

GitHub Pages only serves static files (HTML, CSS, JavaScript). To deploy a TypeScript application, you must compile it to JavaScript first. This guide covers the complete setup process.

## Project Structure

```
your-repo/
├── src/
│   ├── index.ts          # Main TypeScript entry point
│   ├── utils/            # Additional TypeScript modules
│   └── styles/           # CSS files
├── public/
│   ├── index.html        # Main HTML file
│   └── assets/           # Static assets (images, etc.)
├── dist/                 # Compiled output (auto-generated)
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Build tool configuration
```

## Prerequisites

- Node.js (v16 or higher)
- A GitHub repository with GitHub Pages enabled

## Setup Steps

### 1. Initialize the Project

```bash
# Create package.json
npm init -y

# Install TypeScript and build tools
npm install --save-dev typescript vite @types/node

# Install any additional dependencies you need
npm install lodash
npm install --save-dev @types/lodash
```

### 2. Configure TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 3. Configure Build Tool (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/your-repo-name/', // Replace with your GitHub repo name
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
```

### 4. Update `package.json` Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  }
}
```

### 5. Create HTML Entry Point (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your TypeScript App</title>
</head>
<body>
    <div id="app">
        <h1>Loading...</h1>
    </div>
    <script type="module" src="/src/index.ts"></script>
</body>
</html>
```

### 6. Create TypeScript Entry Point (`src/index.ts`)

```typescript
// Example TypeScript code
interface AppConfig {
    title: string;
    version: string;
}

class App {
    private config: AppConfig;

    constructor(config: AppConfig) {
        this.config = config;
        this.init();
    }

    private init(): void {
        const appElement = document.getElementById('app');
        if (appElement) {
            appElement.innerHTML = `
                <h1>${this.config.title}</h1>
                <p>Version: ${this.config.version}</p>
                <button id="clickMe">Click me!</button>
            `;
            
            const button = document.getElementById('clickMe');
            button?.addEventListener('click', this.handleClick.bind(this));
        }
    }

    private handleClick(): void {
        alert('TypeScript is working on GitHub Pages!');
    }
}

// Initialize the app
const app = new App({
    title: 'My TypeScript App',
    version: '1.0.0'
});
```

### 7. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Build
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check without building
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment Process
1. Push changes to the `main` branch
2. GitHub Actions automatically:
   - Installs dependencies
   - Type checks your code
   - Builds the TypeScript to JavaScript
   - Deploys to GitHub Pages
3. Your site will be available at `https://yourusername.github.io/your-repo-name/`

## Important Considerations

### GitHub Pages Limitations
- **Static files only**: No server-side code execution
- **No environment variables**: All configuration must be build-time
- **Path considerations**: Use relative paths or configure base URL correctly
- **HTTPS only**: All external API calls must use HTTPS

### TypeScript Best Practices
- Use strict mode for better type safety
- Organize code into modules for maintainability
- Leverage TypeScript's type system for better developer experience
- Include type checking in your CI/CD pipeline

### Performance Optimization
- Enable source maps for debugging
- Use code splitting for larger applications
- Optimize bundle size with tree shaking
- Consider lazy loading for non-critical code

## Troubleshooting

### Common Issues

**Build fails on GitHub Actions but works locally:**
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility
- Verify TypeScript configuration

**404 errors on GitHub Pages:**
- Check the `base` configuration in `vite.config.ts`
- Ensure all paths are relative or correctly configured
- Verify GitHub Pages source is set to "GitHub Actions"

**TypeScript compilation errors:**
- Run `npm run type-check` locally
- Check `tsconfig.json` configuration
- Ensure all imports have proper type definitions

### Debugging Steps
1. Check GitHub Actions logs for build errors
2. Test the build locally with `npm run build`
3. Verify GitHub Pages settings in repository settings
4. Check browser console for runtime errors

## Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [GitHub Actions Documentation](https://docs.github.com/actions)

## Project-Specific Context
- Configuration: custom
- Generated: 6/24/2025

Remember to reference files with @filename when providing context about specific implementations.
