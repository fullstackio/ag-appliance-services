import Image from "next/image";

/**
 * Demo article body (static dummy content). The lead paragraph is taken from
 * the selected post so the page connects to the clicked card.
 */
export function ArticleContent({ lead }: { lead: string }) {
  return (
    <>
      <p className="article__lead">{lead}</p>

      <div className="article__body">
        <p>
          NestJS gives you a strong opinion out of the box: modules, providers
          and controllers, wired together with dependency injection. That
          structure is a gift, but only if you respect the seams it draws. Here
          is the blueprint I reach for on every new service.
        </p>

        <h2>1. Draw module boundaries around features, not layers</h2>
        <p>
          It is tempting to create one giant <code>services</code> folder and one
          giant <code>controllers</code> folder. Resist it. Group by feature —{" "}
          <em>accounts</em>, <em>billing</em>, <em>notifications</em> — so each
          module owns its controller, service, DTOs and tests. A new engineer can
          then read one folder and understand one capability.
        </p>

        <blockquote>
          If you can&apos;t delete a feature by deleting a folder, your boundaries
          are wrong.
        </blockquote>

        <h2>2. Validate at the edge with DTOs</h2>
        <p>
          Every request that enters the system should pass through a typed DTO
          with <code>class-validator</code> decorators. Validation belongs at the
          boundary, not scattered through your services. Once a payload is inside
          the application it should already be trusted and well-shaped.
        </p>
        <ul>
          <li>
            Use a global <code>ValidationPipe</code> with{" "}
            <code>whitelist: true</code> to strip unknown fields.
          </li>
          <li>
            Keep request and response DTOs separate — they evolve for different
            reasons.
          </li>
          <li>
            Transform primitives explicitly; never trust query strings to be the
            type you expect.
          </li>
        </ul>

        <h2>3. Keep controllers thin</h2>
        <p>
          A controller&apos;s job is to translate HTTP into a method call and back
          again. No business rules, no database queries. If a controller method is
          longer than a few lines, the logic wants to move into a service where it
          can be unit-tested without spinning up the HTTP layer.
        </p>

        <figure>
          <Image
            src="/assets/images/blog4.png"
            alt="Diagram of a clean NestJS request flow"
            width={1280}
            height={640}
            sizes="(max-width: 900px) 100vw, 720px"
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption>
            Request flow: controller → service → repository, validated at the
            edge.
          </figcaption>
        </figure>

        <h2>4. Make the database boundary explicit</h2>
        <p>
          Whether you use TypeORM, Prisma or raw queries, hide it behind a
          repository or data-access layer. Your services should speak in domain
          terms, not query builders. The day you swap an ORM — and that day comes —
          you will only touch one layer.
        </p>

        <h2>5. Test the seams</h2>
        <p>
          Thin controllers and explicit boundaries pay off here: services become
          trivially unit-testable, and a small set of end-to-end tests against the
          real HTTP surface catches wiring mistakes. Aim for fast feedback first,
          broad coverage second.
        </p>

        <p>
          None of this is exotic. It is just discipline applied early, when it is
          cheap. Get the boundaries right and a NestJS codebase will stay a
          pleasure to change long after the first release ships.
        </p>
      </div>
    </>
  );
}
