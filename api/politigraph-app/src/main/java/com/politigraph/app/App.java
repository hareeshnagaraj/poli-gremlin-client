package com.politigraph.app;
import java.util.Iterator;
import org.apache.tinkerpop.gremlin.driver.Client;
import org.apache.tinkerpop.gremlin.driver.Cluster;
import org.apache.tinkerpop.gremlin.driver.Result;
import org.apache.tinkerpop.gremlin.driver.ResultSet;
import org.apache.tinkerpop.gremlin.structure.Property;
import org.apache.tinkerpop.gremlin.structure.Vertex;
import org.apache.tinkerpop.gremlin.structure.VertexProperty;
import org.janusgraph.graphdb.database.StandardJanusGraph;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {        
        try{
            Cluster cluster = Cluster.open("/Users/hareeshnagaraj/Desktop/work/poli-gremlin-client/api/server-conf/remote.yaml");
            System.out.println( "1) Opened cluster" );

            Client client = cluster.connect();
            System.out.println( "2) Created client, initializing..." );
            client.init();
            System.out.println( "3) Initialized client" );
            ResultSet results = client.submit("graph");
            System.out.println( "4) Submitted results" );
            results.stream().map(i -> i.get(StandardJanusGraph.class));

            // Iterate and print
            System.out.println( "5) Streamed results: " + results.toString());
            Iterator<Result> rIter = results.iterator();
            Result r;
            Vertex v;
            StandardJanusGraph s;
            while(rIter.hasNext())
            {
                r = rIter.next();
                System.out.println(r.toString());
                s = (StandardJanusGraph)r.getObject();  // Working on reading these values
                Iterator<Vertex> vIt = s.vertices();

                while(vIt.hasNext())
                {
                    v = vIt.next();
                }
                
            }

            System.out.println( "6) Finished iterating");

        }
        catch(Exception e)
        {
            System.out.println(e.toString());
        }
    }
}
