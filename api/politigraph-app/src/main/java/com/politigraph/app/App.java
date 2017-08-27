package com.politigraph.app;
import java.util.Iterator;
import org.apache.tinkerpop.gremlin.driver.Client;
import org.apache.tinkerpop.gremlin.driver.Cluster;
import org.apache.tinkerpop.gremlin.driver.Result;
import org.apache.tinkerpop.gremlin.driver.ResultSet;
import org.apache.tinkerpop.gremlin.structure.Property;

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
            ResultSet results = client.submit("g.V()");
            System.out.println( "4) Submitted results" );
            results.stream().map(i -> i.get(Integer.class) * 2);

            // Iterate and print
            System.out.println( "5) Streamed results: " + results.toString());
            Iterator<Result> iter = results.iterator();
            Result r;
            while(iter.hasNext())
            {
                r = iter.next();
                System.out.println(r.toString());
            }

            System.out.println( "6) Finished iterating");

        }
        catch(Exception e)
        {
            System.out.println(e.toString());
        }
    }
}
