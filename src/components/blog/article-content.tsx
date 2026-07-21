import Image from "next/image";

/**
 * Demo article body (static placeholder content). The lead paragraph is taken
 * from the selected post so the page connects to the clicked card. Headings are
 * kept meaningful (home-appliance theme); paragraphs use lorem ipsum.
 */
export function ArticleContent({ lead }: { lead: string }) {
  return (
    <>
      <p className="article__lead">{lead}</p>

      <div className="article__body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat.
        </p>

        <h2>Start with a proper diagnosis</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum sed ut perspiciatis unde omnis.
        </p>

        <blockquote>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
          tempor incididunt ut labore et dolore.
        </blockquote>

        <h2>Check the basics first</h2>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt neque porro quisquam est.
        </p>
        <ul>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
            eiusmod tempor.
          </li>
          <li>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip.
          </li>
          <li>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore.
          </li>
        </ul>

        <h2>Keep it running longer</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab
          illo inventore veritatis et quasi architecto.
        </p>

        <figure>
          <Image
            src="/assets/images/blog4.png"
            alt="Home appliance being serviced"
            width={1280}
            height={640}
            sizes="(max-width: 900px) 100vw, 720px"
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
            eiusmod.
          </figcaption>
        </figure>

        <h2>When to call a professional</h2>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident.
        </p>

        <h2>The bottom line</h2>
        <p>
          Et harum quidem rerum facilis est et expedita distinctio. Nam libero
          tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
          minus id quod maxime placeat facere possimus omnis voluptas assumenda.
        </p>

        <p>
          Temporibus autem quibusdam et aut officiis debitis aut rerum
          necessitatibus saepe eveniet ut et voluptates repudiandae sint et
          molestiae non recusandae itaque earum rerum hic tenetur a sapiente
          delectus.
        </p>
      </div>
    </>
  );
}
